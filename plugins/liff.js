// import liff from "@line/liff"; 
// Vue.use(liff)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      // hello: (msg) => `Hello ${msg}!`
      toggleLiffPlugin: async () => {
        // return
        const runtimeConfig = useRuntimeConfig();
        await liff.init({ liffId: runtimeConfig.public.lineLiffId });

        if (!liff.isInClient()) {
          console.log('inclient')
          if (!liff.isLoggedIn()) {
          console.log('login')
            liff.login();
          }
        }
        //initializeApp
        const browserLanguage = liff.getLanguage();
        const sdkVersion = liff.getVersion();
        const lineVersion = liff.getLineVersion();
        const isLoggedIn = liff.isLoggedIn();
        const deviceOS = liff.getOS();
        const id = liff.getAId();

        console.log({
          browserLanguage,
          sdkVersion,
          lineVersion,
          isLoggedIn,
          deviceOS,
          id,
        });


        return liff
          .getProfile()
          .then((res) => {
            console.log(res)
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
    },
  };
});
