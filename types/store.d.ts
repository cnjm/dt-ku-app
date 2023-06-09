import { RoleInfo } from "../src/api/user/model/user.model";
export interface UserInfo {
  // 用户id
  userId: string | number;
  // 用户名
  userName: string;
  // 角色列表
  roles?: RoleInfo[];
}
