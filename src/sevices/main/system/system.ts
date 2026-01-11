import hyRequest from '../../index'
import { IDataType } from '../../type'
// 1.页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url, // url: pageName + /list => user/list
    data: queryInfo,
  })
}
// 2.删除某条记录
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url, // url: pageName + /1 => /users/id
  })
}
// 3.创建某条记录
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData,
  })
}
// 4.修改某条记录
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData,
  })
}
