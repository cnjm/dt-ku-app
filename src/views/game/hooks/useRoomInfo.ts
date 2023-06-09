import { storeToRefs } from "pinia";
import { Socket } from "socket.io-client";
import { computed, inject, reactive } from "vue";
// import { getGroupsUserList } from "/@/api/dingtalk";
import { useMessage } from "/@/hooks/web/useMessage";
// import { corpId } from "/@/utils/dingtalk";
import { useUserStoreWithOut } from "/@/store/modules/user";

export function useRoomInfo() {
  const { infoToast } = useMessage();
  const userStore = useUserStoreWithOut();
  const { ddUserInfo } = storeToRefs(userStore);

  // 创建 socket 实例
  const socket = inject("socket") as Socket;
  const roomInfo = reactive({
    // 是否开局
    status: false,
    activeUserList: [] as any[],
    roomUserList: [] as any[],
  });
  // 未加入已开始0 未加入未开始-1 已加入并且已开始-2 已加入未开始-3
  const roomStatus = computed(() => {
    // 在房间内
    if (roomInfo.roomUserList.some((item) => item.userId === ddUserInfo.value?.userId)) {
      // 房间已开始
      return roomInfo.status ? 2 : 3;
    } else {
      return roomInfo.status ? 0 : 1;
    }
  });

  // 房间信息
  socket.on("roomInfo", (res) => {
    roomInfo.status = res.data.status;
    roomInfo.roomUserList = res.data.roomUserList;
    // roomInfo.roomUserList = res.data.roomUserList.map((item) => {
    //   item.action = res.data.activeUserList.includes(item.socketId);
    //   return item;
    // });
  });

  // 欢迎播报
  socket.on("joinRoomUser", (res) => {
    infoToast({ message: `欢迎${res.data.name}加入房间` });
  });

  async function joinRoom() {
    socket.emit("receive", {
      event: "joinEvent",
      userInfo: ddUserInfo.value,
    });
  }

  async function initSocket() {
    await userStore.getDdUserInfo();
    socket.connect(); //连接socket服务器
    socket.emit("receive", {
      event: "updateInfo",
      userInfo: ddUserInfo.value,
    });
  }
  return {
    initSocket,
    joinRoom,
    roomInfo,
    roomStatus,
  };
}
