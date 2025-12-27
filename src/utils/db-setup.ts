import { supabase } from '../plugins/supabase'

// 检查并创建数据库表结构
export async function setupDatabase() {
  try {
    // 创建角色表
    const rolesTable = await (supabase as any).rpc('create_roles_table', {})
    if (rolesTable.error) throw rolesTable.error

    // 创建权限表
    const permissionsTable = await (supabase as any).rpc(
      'create_permissions_table',
      {}
    )
    if (permissionsTable.error) throw permissionsTable.error

    // 创建角色权限关联表
    const rolePermissionsTable = await (supabase as any).rpc(
      'create_role_permissions_table',
      {}
    )
    if (rolePermissionsTable.error) throw rolePermissionsTable.error

    // 创建用户资料表（扩展默认的auth.users）
    const profilesTable = await (supabase as any).rpc(
      'create_profiles_table',
      {}
    )
    if (profilesTable.error) throw profilesTable.error

    // 创建用户角色关联表
    const userRolesTable = await (supabase as any).rpc(
      'create_user_roles_table',
      {}
    )
    if (userRolesTable.error) throw userRolesTable.error

    // 创建部门表
    const departmentsTable = await (supabase as any).rpc(
      'create_departments_table',
      {}
    )
    if (departmentsTable.error) throw departmentsTable.error

    // 创建初始角色和权限
    const initialData = await (supabase as any).rpc('insert_initial_data', {})
    if (initialData.error) throw initialData.error

    console.log('数据库初始化成功')
    return true
  } catch (error) {
    console.error('数据库初始化失败:', error)
    return false
  }
}

// 在Supabase中创建必要的SQL函数（需要在Supabase SQL编辑器中执行一次）
export const setupDatabaseSql = `
-- 1. 确保UUID扩展可用
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. 创建角色表（修复UUIDID为UUID）
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建权限表
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建角色权限关联表
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role_id, permission_id)
);

-- 5. 创建用户资料表
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  phone VARCHAR(20) UNIQUE,
  avatar_url TEXT,
  department_id UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 创建用户角色关联表
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- 7. 创建部门表
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES departments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 创建用户注册触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'phone');
  RETURN NEW;
END;
$$;

-- 9. 创建触发器（如果不存在）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END
$$;

-- 10. 插入初始角色数据
INSERT INTO roles (name, description)
VALUES
  ('admin', '系统管理员，拥有所有权限'),
  ('editor', '编辑，拥有部分管理权限'),
  ('viewer', '查看者，只有查看权限')
ON CONFLICT (name) DO NOTHING;

-- 11. 插入初始权限数据
INSERT INTO permissions (name, description)
VALUES
  ('users:read', '查看用户'),
  ('users:write', '创建/编辑用户'),
  ('users:delete', '删除用户'),
  ('roles:read', '查看角色'),
  ('roles:write', '创建/编辑角色'),
  ('departments:read', '查看部门'),
  ('departments:write', '创建/编辑部门')
ON CONFLICT (name) DO NOTHING;

-- 12. 为角色分配初始权限
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name IN (
  'users:read', 'users:write', 'users:delete',
  'roles:read', 'roles:write',
  'departments:read', 'departments:write'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

`
