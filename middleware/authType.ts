export default defineNuxtRouteMiddleware((to) => {
  if (
    useCookie("authToken").value &&
    useCookie("type").value === "translator"
  ) {
    return;
  } else {
    return abortNavigation();
  }
});
