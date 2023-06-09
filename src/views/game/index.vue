<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import { sendGroupMessages, getGroupsUserList } from "/@/api/dingtalk";
  import { useUserStore } from "/@/store/modules/user";
  import { ddConfig } from "/@/utils/dingtalk";
  // import { useMessage } from "/@/hooks/web/useMessage";
  import { useRoomInfo } from "./hooks/useRoomInfo";
  // const { infoToast } = useMessage();
  defineOptions({ inheritAttrs: false, name: "Game", meta: { title: "游戏大厅" } });

  // socket.emit("events", { test: "测试数据" }, (data) => {
  //   console.log(data); // { msg1: '测试1', msg2: '测试2' }
  // });
  const route = useRoute();
  const openConversationId = (route?.query?.openConversationId as string) || "cidhuU5+oKfbiLZQhF1XIhGvA==";
  const userStore = useUserStore();
  const { ddUserInfo } = storeToRefs(userStore);

  const { initSocket, joinRoom, roomInfo, roomStatus } = useRoomInfo();

  ddConfig();
  initSocket();

  const groupMessages = ref("");

  // const matchData = reactive({
  //   joinUserList: [] as any[],
  //   isJoin: false,
  // });

  // socket.on("joinUserList", (res) => {
  //   matchData.joinUserList = res.data.joinUserList;
  //   matchData.isJoin = matchData.joinUserList.some((item) => item.userId === ddUserInfo.value?.userId);
  // });

  // function startMatch() {
  //   socket.emit("startMatch");
  // }

  function onSubmit() {
    sendGroupMessages({ message: ddUserInfo.value?.name + "：" + groupMessages.value, openConversationId }).then(() => {
      groupMessages.value = "";
      console.log("发送成功");
    });
  }
</script>

<template>
  <div>
    <div>{{ roomInfo }}</div>
    <div v-if="roomStatus === 1" class="mask fixed bottom-0 left-0 flex items-center justify-center">
      <van-button size="small" type="primary" @click="joinRoom"> 加入房间 </van-button>
    </div>
    <template v-else>
      <div class="flex items-center p-50px text-28px">
        <van-image class="border border-green" round fit="cover" width="4rem" height="4rem" :src="ddUserInfo?.avatar" />
        <div class="ml-50px">欢迎您：{{ ddUserInfo?.name }}</div>
      </div>

      <div class="p-20px" v-if="ddUserInfo?.userId === 'manager5788'">
        <van-button type="primary" size="mini" @click="getGroupsUserList">更新群成员</van-button>
        <!-- <van-button type="primary" size="mini" @click="createMatch">创建对局</van-button>
        <van-button type="primary" size="mini" @click="startMatch">开始对局</van-button> -->
      </div>

      <div class="p-30px">房间成员({{ roomInfo.activeUserList.length }}/{{ roomInfo.roomUserList.length }})</div>
      <div class="flex p-30px pt-0">
        <div
          v-for="item in roomInfo.roomUserList"
          :key="item.id"
          class="flex flex-col items-center mr-30px"
          :class="{ gray: !item.action }"
        >
          <van-image round fit="cover" width="2rem" height="2rem" :src="item?.avatar" />
          <div :class="{ 'user-name': item.action }">{{ item?.name }}</div>
        </div>
      </div>

      <div class="send fixed bottom-0 left-0">
        <van-form @submit="onSubmit" :show-error-message="false">
          <van-field
            v-model.trim="groupMessages"
            placeholder="请输入"
            :rules="[{ required: true, message: '不能发送空白消息' }]"
          >
            <template #button>
              <van-button size="small" type="primary" native-type="submit"> 发送 </van-button>
            </template>
          </van-field>
        </van-form>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
  .send {
    width: 100%;
    border-top: 1px solid #f5f5f5;
  }
  .mask {
    width: 100%;
    height: 100%;
  }
  .gray {
    filter: grayscale(80%);
  }
  .user-name {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: -50px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #70df55;
    }
  }
</style>
