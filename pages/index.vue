<template>
  <div class="wrap center d-col">
    <span> loading... || {{ msg }}</span>
  </div>
</template>
<script setup>
const form = ref({ userId: "", displayName: "", isFriend: null });
const { $toggleLogin, $toggleShare } = useNuxtApp();
const params = ref(null);
const msg = ref(null);

onMounted(() => {
  //   setTimeout(() => getLiff(), 2000);
  getLiff();
});

const getLiff = async () => {
  params.value = window.location.search;
  if (params.value.length) params.value = params.value.split("=")[1];

  try {
    form.value = await $toggleLogin();
    step.value = 1;

    if (form.value.isFriend) {
      await $toggleShare(
        picker(form.value.displayName, form.value.userId),
        "今すぐ参加!"
      );
    } else {
      await postReferal(params, form.value.userId)
        .then((res) => (msg.value = "success"))
        .catch((e) => (msg.value = "failed"));

        msg.value= 'what'

      setTimeout(() => {
        window.location.href = "https://lin.ee/wMD9Hbf"; //get from https://manager.line.biz/account/{YOUR_OA_LINE_ID}/gainfriends/add-friend-url
      }, 800);
      //
    }
  } catch (e) {
    msg.value = 'wrong'
    console.error(e);
  }
};

const postReferal = async (referalId, id) => {
  let url = "https://vot.cuzzor.com/line/referral/" + referalId;
  const data = await useFetch(url, { method: "PUT", body: { id } });
  console.log(data); // for debug
  return;
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
                  label: "今すぐ参加",
                  // uri: `https://liff.line.me/${runtimeConfig.public.lineLiffId}?key=${id}#URL-fragment`, // have trouble get 'id'
                  // label: `${name} 今すぐ参加?`,
                  uri: `https://liff-share.vercel.app?inviter=${id}`, //use outside url instead to get params
                },
                color: "#FFFFFF",
                height: "sm",
                style: "link",
              },
            ],
            backgroundColor: "#FF4655",
            height: "35px",
            width: "85%",
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
  //   background-color: black;
  font-weight: bold;
  height: 100vh;

  h1 {
    color: white;
    font-size: 64px;
  }
  span {
    // color: #e6e6e6;
    color: black;
    font-size: 16px;
    word-break: break-all;
  }
  a {
    margin: 16px 0;
  }
}
</style>
