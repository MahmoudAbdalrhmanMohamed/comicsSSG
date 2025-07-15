<template>
  <div id="ad-container"></div>
</template>

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

onMounted(() => {
  if (process.env.NODE_ENV === "production") {
    const container = document.getElementById("ad-container");

    if (container) {
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", "ca-pub-4915623133359828");
      ins.setAttribute("data-ad-slot", "5506775687");
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      container.appendChild(ins);

      const script = document.createElement("script");
      script.text = "(adsbygoogle = window.adsbygoogle || []).push({});";
      container.appendChild(script);
    }
  }
});
</script>
