<template>
  <div class="wrap center d-col">
    <h1>hello world! - share</h1>
    <span>
      {{ form.userId }}
    </span>
    <span>
      {{ form.displayName }}
    </span>
    <span> url: {{ url }} </span>
    <a href="https://lin.ee/yYQBlWv"
      ><img
        src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
        alt="加入好友"
        height="36"
        border="0"
    /></a>
    <span v-if="!form.isFriend">尚未成為好友</span>
    <span v-else>已加入！</span>
  </div>
</template>
<script setup>
const form = ref({ userId: "", displayName: "", isFriend: "" });
const { $toggleLogin, $toggleShare } = useNuxtApp();
const url = ref("");

onMounted(() => {
  url.value = window.location.href?.split("?")?.[1];
  setTimeout(() => getLiff(), 2000);
});

const getLiff = async () => {
  try {
    form.value = await $toggleLogin();
    // if (form.value.isFriend) await $toggleShare(picker(form.value.displayName, form.value.userId));
  } catch (e) {
    console.error(e);
  }
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
                  //   uri: "https://liff.line.me/1657931434-lbwp08oO",
                  url: "https://f709-111-252-67-35.ngrok-free.app?id=" + id,
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
