import _ from "lodash";
// import liff from "@line/liff";
// Vue.use(liff)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toggleGetProfile: async () => {
        const isFriend = await liff.getFriendship();

        return liff
          .getProfile()
          .then((res) => {
            return {
              userId: res?.userId,
              displayName: res?.displayName,
              isFriend: isFriend?.friendFlag,
            };
          })
          .catch((e) => {
            console.log(e);
            return null;
          });
      },
      toggleLoginPromise: async (location) => {
        const runtimeConfig = useRuntimeConfig();
        await liff.init({ liffId: runtimeConfig.public.lineLiffId });

        if (new URL(location).searchParams.get("liff.state") !== null) {
          // 由於 SDK 尚未處理 liff.state 的跳轉
          // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
          await new Promise((resolve) => {});
        }
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: location.href });
          // 由於用戶尚未登入 LINE
          // 所以透過一個不會結束的 Promise 避免程式繼續執行下去
          await new Promise((resolve) => {});
        }
      },

      isFriend: async () => {
        return _.get(await liff.getFriendship(), "friendFlag", false);
      },
      sleep: async (t) => {
        await new Promise((resolve) => {
          setTimeout(resolve, t);
        });
      },
      toggleLogin: async () => {
        // return
        const runtimeConfig = useRuntimeConfig();
        await liff.init({ liffId: runtimeConfig.public.lineLiffId });

        if (!liff.isInClient()) {
          if (!liff.isLoggedIn()) {
            liff.login();
          }
        }
        //initializeApp
        const isFriend = await liff.getFriendship();
        // const state = liff.state;
        // const browserLanguage = liff.getLanguage();
        // const sdkVersion = liff.getVersion();
        // const lineVersion = liff.getLineVersion();
        // const isLoggedIn = liff.isLoggedIn();
        // const isApiAvailable = liff.isApiAvailable("shareTargetPicker");
        // const deviceOS = liff.getOS();
        // const id = liff.getAId();

        // liff
        //   .getFriendship()
        //   .then((data) => {
        //     console.log(data);
        //     if (data.friendFlag) {
        //       // something you want to do
        //     }
        //   })
        //   .catch((e) => console.log(e));

        // console.log({
        //   state,
        //   browserLanguage,
        //   sdkVersion,
        //   lineVersion,
        //   isApiAvailable,
        //   isLoggedIn,
        //   deviceOS,
        //   id,
        // });

        return liff
          .getProfile()
          .then((res) => {
            console.log(res);
            return {
              userId: res?.userId,
              displayName: res?.displayName,
              isFriend: isFriend?.friendFlag,
            };
          })
          .catch((e) => {
            console.log(e);
            return null;
          });
      },
      toggleShare: async (contents, text) => {
        liff
          .shareTargetPicker(
            [
              {
                type: "flex",
                altText: text,
                contents,
              },
            ],
            {
              isMultiple: true,
            }
          )
          .then(function (res) {
            if (res) {
              liff.closeWindow();
              // succeeded in sending a message through TargetPicker
              console.log(`[${res.status}] Message sent!`);
            } else {
              // sending message canceled
              console.log("TargetPicker was closed!");
            }
          })
          .catch(function (error) {
            // something went wrong before sending a message
            console.log("something wrong happen");
          });
      },
      toggleSendMSg: async () => {
        liff
          .sendMessages([
            {
              type: "text",
              text: "Hello, world",
            },
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log("error", err);
          });
      },
    },
  };
});
