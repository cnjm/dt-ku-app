import * as dd from "dingtalk-jsapi";
import { getConfigData, getUserInfo } from "/@/api/dingtalk";
import { DdUserInfo } from "/@/store/modules/user";
export const corpId = "dingee74dd6848722a8aacaaa37764f94726";
export function ddConfig(): void {
  getConfigData({
    url: encodeURIComponent(`${location.protocol}//${location.host}${location.pathname}`),
  }).then((data) => {
    dd.config({
      nonceStr: data.nonceStr,
      timeStamp: data.timeStamp,
      signature: data.signature,
      appId: data.appId, // 必填，应用ID
      type: 0,
      corpId,
      jsApiList: [
        "runtime.info",
        "biz.contact.choose",
        "device.notification.confirm",
        "device.notification.alert",
        "device.notification.prompt",
        "biz.ding.post",
        "biz.util.openLink",
      ], // 必填，需要使用的jsapi列表
    });
  });
}

export function ddGetUserInfo(): Promise<DdUserInfo> {
  return new Promise((resolve, reject) => {
    dd.runtime.permission
      .requestAuthCode({ corpId })
      .then(({ code }) => {
        getUserInfo({
          requestAuthCode: code,
        }).then((result) => {
          resolve(result);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
