export default defineNuxtRouteMiddleware((to) => {
  if (useCookie("otpToken").value) {
    return;
  } else {
    return abortNavigation();
  }
});
