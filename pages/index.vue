<template>
  <div class="wrap d-col center">
    <h1>Share</h1>
    <span>{{ page }} {{ time }}</span>
    <a :href="`https://line.me/R/ti/p/@161uojua`">test @161uojua</a>
  </div>
</template>
<script setup>
const {
  $toggleGetProfile,
  $toggleShare,
  $toggleLoginPromise,
  $toggleSendMSg,
  $isFriend,
  $sleep,
} = useNuxtApp();
const page = ref(null);
const time = ref(0);

onMounted(() => {
  init();
});

const init = async () => {
  await waitAddFriend(); // 等待用戶加入好友
  showPage("main"); // 顯示主要頁面
  //
  $toggleGetProfile().then((res) =>
    $toggleShare(picker(res.displayName, res.userId))
  );
};

const waitAddFriend = async () => {
  await $toggleLoginPromise(window.location);
  if (await $isFriend()) return;

  console.log("is friend ? ", await $isFriend());

  showPage("follow");
  while (true) {
    await $sleep(5000);
    time.value = JSON.parse(time.value) + 1;
    if (await $isFriend()) return;
  }
};

const showPage = (val) => {
  page.value = val;
};

const picker = (name, id) => ({
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "image",
        position: "absolute",
        margin: "0px",
        aspectMode: "cover",
        offsetTop: "0px",
        offsetStart: "0px",
        size: "full",
        url: "https://i.ibb.co/0MLTQkg/pattern.png",
        offsetBottom: "0px",
        offsetEnd: "0px",
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            url: "https://i.ibb.co/48rD51s/logo.png",
            aspectMode: "fit",
            align: "start",
            aspectRatio: "15:2",
          },
        ],
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "いらっしゃいませ!",
                color: "#F64453",
                weight: "bold",
                size: "24px",
              },
              {
                type: "text",
                text: "ゆうえんち",
                color: "#FFFFFF",
                weight: "bold",
                size: "42px",
              },
            ],
            paddingTop: "0px",
            offsetTop: "16px",
          },
          {
            type: "text",
            text: "「ゆうえんち」の公式LINEアカウントに参加して、最新のゲーム情報や特典イベントを手に入れましょう！",
            color: "#FFFFFF",
            weight: "bold",
            size: "10px",
            wrap: true,
            align: "center",
            offsetTop: "8px",
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: `${name} 今すぐ参加?`,
                  uri: "https://liff.line.me/1657931434-lbwp08oO?inviter=" + id,
                  //   url: "https://ca1f-2001-b011-80c0-1014-b58c-f81c-c91c-faeb.ngrok-free.app/share?id=" + id,
                },
                color: "#FFFFFF",
                height: "sm",
                style: "link",
              },
            ],
            backgroundColor: "#FF4655",
            height: "35px",
            cornerRadius: "8px",
            paddingAll: "0px",
            alignItems: "center",
            justifyContent: "center",
          },
        ],
        height: "100%",
        justifyContent: "space-around",
        paddingStart: "24px",
        paddingEnd: "24px",
        flex: 1,
        alignItems: "center",
      },
    ],
    background: {
      type: "linearGradient",
      angle: "126.12deg",
      startColor: "#2B2F45",
      endColor: "#C44051",
    },
    maxHeight: "300px",
    height: "300px",
  },
});
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
