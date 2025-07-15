import DisableDevtool from "disable-devtool";

export default defineNuxtPlugin(() => {
  if (import.meta.client && process.env.NODE_ENV === "production") {
    // More aggressive configuration
    // DisableDevtool({
    //   md5: true,
    //   clearInterval: false,
    //   disableMenu: true,
    //   stopIntervalTime: 1000, // More frequent checks
    //   url: "", // Consider redirecting to a warning page
    //   clearLog: true, // Clear console logs
    //   disableSelect: true, // Disable text selection
    //   disableCopy: true, // Disable copy/paste
    //   disableCut: true,
    //   ondevtoolopen: (type) => {
    //     const newTab = window.open(window.location.href, "_blank");
    //     if (newTab) {
    //       window.close(); // Close the old tab
    //     } else {
    //       window.close();
    //     }
    //   },
    // });

    // // Additional check on page load
    // window.addEventListener("load", () => {
    //   const isDevToolsOpen = /./.test.bind({});
    //   isDevToolsOpen.toString = () => {
    //     const newTab = window.open(window.location.href, "_blank");
    //     if (newTab) {
    //       window.close();
    //     } else {
    //       window.close();
    //     }
    //     return "";
    //   };
    // });
  }
});
