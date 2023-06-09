export interface ConfigParams {
  url: string;
}
export interface UserInfoParams {
  requestAuthCode: string;
}

export interface GroupsUserParams {
  openConversationId: string;
  // coolAppCode: string;
}

export interface MessageParams {
  openConversationId?: string;
  message: string;
}
