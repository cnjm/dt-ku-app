<script setup lang="ts">
  defineOptions({ inheritAttrs: false, name: "TKKill", meta: { title: "三国杀" } });
</script>

<template>
  <div>
    <div v-auth="['s_admin', 'test']">权限</div>
    <div v-auth="['custom']">custom权限</div>
  </div>
</template>

<style scoped lang="less"></style>
