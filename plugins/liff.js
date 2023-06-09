// import liff from "@line/liff";
// Vue.use(liff)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      // hello: (msg) => `Hello ${msg}!`
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
        // const state = liff.state;
        // const browserLanguage = liff.getLanguage();
        // const sdkVersion = liff.getVersion();
        // const lineVersion = liff.getLineVersion();
        // const isLoggedIn = liff.isLoggedIn();
        // const isApiAvailable = liff.isApiAvailable("shareTargetPicker");
        const isFriend = await liff.getFriendship();
        // const deviceOS = liff.getOS();
        // const id = liff.getAId();

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
        // const runtimeConfig = useRuntimeConfig();
        // await liff.init({ liffId: runtimeConfig.public.lineLiffId });

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
              liff.closeWindow();
              // sending message canceled
              console.log("TargetPicker was closed!");
            }
          })
          .catch(function (error) {
            // something went wrong before sending a message
            console.log("something wrong happen");
          });
      },
    },
  };
});
