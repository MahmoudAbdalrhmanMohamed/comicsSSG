<template><div></div></template>

<script setup>
useHead({
  script: [
    {
      type: "text/javascript",
      children: `
    function downloadJSAtOnload() {
      var element = document.createElement("script");
      element.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4915623133359828";
      element.async = true;
      element.crossOrigin = "anonymous";
      document.body.appendChild(element);
    }
    if (window.addEventListener)
      window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
      window.attachEvent("onload", downloadJSAtOnload);
    else
      window.onload = downloadJSAtOnload;
  `,
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-HH5Z1CV6Z8",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HH5Z1CV6Z8');
      `,
      type: "text/javascript",
    },
  ],
});
</script>
