<template>
  <div class="wrap d-col center">
    <h1>Share</h1>
    {{ page }}
    <a :href="`https://line.me/R/ti/p/@161uojua`">test @161uojua</a>
  </div>
</template>
<script setup>
const { $toggleLoginPromise, $isFriend } = useNuxtApp();
const page = ref(null)

onMounted(() => {
  init();
});

const init = async () => {
  await waitAddFriend(); // 等待用戶加入好友
  showPage("main"); // 顯示主要頁面
};

const waitAddFriend = async () => {
  await $toggleLoginPromise(window.location);
  if (await $isFriend()) return;

  showPage("follow");
  while (true) {
    await sleep(5000);
    if (await $isFriend()) return;
  }
};

const showPage = (val) => {
    page.value = val
}
</script>
<style lang="scss" scoped>
.wrap {
  background-color: black;
  font-weight: bold;
  height: 100vh;

  h1 {
    color: white;
    font-size: 64px;
  }
  span {
    color: #e6e6e6;
    font-size: 16px;
    word-break: break-all;
  }
  a {
    margin: 16px 0;
  }
}
</style>
