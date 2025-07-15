export default defineNuxtRouteMiddleware((to) => {
  if (!useCookie("authToken").value) {
    return;
  } else {
    return abortNavigation();
  }
});
