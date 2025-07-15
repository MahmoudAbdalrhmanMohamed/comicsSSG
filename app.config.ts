export default defineAppConfig({
  ui: {
    strategy: "override",
    selectMenu: {},

    primary: "white",
    notifications: {
      wrapper: "fixed w-fit h-fit z-[80]",
    },
    modal: {
      overlay: {
        background:
          "bg-black/80 dark:bg-black/80 backdrop-blur-lg cursor-pointer",
      },
    },
    checkbox: {
      wrapper: "relative flex items-start",
      container: "flex items-center h-5",
      base: "h-4 w-4 bg-transparent indeterminate:bg-transparent indeterminate:border-transparent checked:bg-d36 checked:border-d36 focus:outline-none focus:ring-0 hover:bg-transparent focus:bg-transparent focus:border-d36 hover:border-d36",
      form: "form-checkbox",
      rounded: "rounded",
      color: "checked:text-white text-transparent",
      background: "bg-transparent",
      border: "border border-d36",
      ring: "focus:ring-0 focus:ring-offset-0",
      inner: "ms-3 flex flex-col",
      label: "text-sm font-medium text-bf",
      required: "text-sm text-red-500 dark:text-red-400",
    },
  },
});
