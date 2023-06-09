import { ConfigParams, GroupsUserParams, MessageParams, UserInfoParams } from "./model";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/axios/index";

enum Api {
  GET_CONFIG_DATA = "/dingtalk/getConfigData",
  GET_USER_INFO = "/dingtalk/getUserInfo",
  SEND_MESSAGES = "/dingtalk/sendGroupMessages",
  GROUPS_USER_LIST = "/dingtalk/getGroupsUserList",
  CREATE_MATCH = "/dingtalk/createMatch",
}

/**
 * @description: 鉴权
 */
export const getConfigData = (params: ConfigParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<any>({ url: Api.GET_CONFIG_DATA, params }, { errorMessageMode: mode });
/**
 * @description: 获取用户信息
 */
export const getUserInfo = (params: UserInfoParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<any>({ url: Api.GET_USER_INFO, params }, { errorMessageMode: mode });

/**
 * @description: 获取群用户信息
 */
export const getGroupsUserList = (params: GroupsUserParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<any>({ url: Api.GROUPS_USER_LIST, params }, { errorMessageMode: mode });
/**
 * @description: 发送群聊信息
 */
export const sendGroupMessages = (params: MessageParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<any>({ url: Api.SEND_MESSAGES, params }, { errorMessageMode: mode });
/**
 * @description: 创建对局
 */
export const createMatch = (params: MessageParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<any>({ url: Api.CREATE_MATCH, params }, { errorMessageMode: mode });
