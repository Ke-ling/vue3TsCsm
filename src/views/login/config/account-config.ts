export const rules = {
  name: [
    {
      required: true, //必传项,
      message: '请输入用户名', //错误提示
      trigger: 'blur', //失去焦点时触发
    },
    {
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      message: '用户名只能包含字母和数字，且长度为3-10位',
    },
  ],
  password: [
    {
      required: true, //必传项,
      message: '请输入密码', //错误提示
      trigger: 'blur', //失去焦点时触发
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '密码只能包含字母和数字，且长度为5-10位',
    },
  ],
}
