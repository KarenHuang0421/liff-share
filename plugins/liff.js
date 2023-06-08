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
          console.log("inclient");
          if (!liff.isLoggedIn()) {
            console.log("login");
            liff.login();
          }
        }
        //initializeApp
        const browserLanguage = liff.getLanguage();
        const sdkVersion = liff.getVersion();
        const lineVersion = liff.getLineVersion();
        const isLoggedIn = liff.isLoggedIn();
        const isApiAvailable = liff.isApiAvailable("shareTargetPicker");
        const deviceOS = liff.getOS();
        const id = liff.getAId();

        liff
          .getFriendship()
          .then((data) => {
            console.log(data);
            if (data.friendFlag) {
              // something you want to do
            }
          })
          .catch((e) => console.log(e));

        console.log({
          browserLanguage,
          sdkVersion,
          lineVersion,
          isApiAvailable,
          isLoggedIn,
          deviceOS,
          id,
        });

        return liff
          .getProfile()
          .then((res) => {
            console.log(res);
            return {
              userId: res?.userId,
              displayName: res?.displayName,
            };
          })
          .catch((e) => {
            console.log(e);
            return null;
          });
      },
      toggleShare: async (contents) => {
        liff
          .shareTargetPicker(
            [
              {
                type: "flex",
                altText: "今すぐ参加!",
                contents,
              },
            ],
            {
              isMultiple: true,
            }
          )
          .then(function (res) {
            if (res) {
              // liff.closeWindow();
               // succeeded in sending a message through TargetPicker
              console.log(`[${res.status}] Message sent!`);
            } else {
              // sending message canceled
              console.log("TargetPicker was closed!");
            }
          })
          .catch(function (error) {
            console.log(error);
            // something went wrong before sending a message
            console.log("something wrong happen");
          });
      },
    },
  };
});
