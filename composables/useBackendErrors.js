export const useBackendErrors = () => {
  const toast = useToast(); // Initialize toast

  const handleBackendErrors = (response) => {
    if (response.errors) {
      // Handle structured errors
      Object.entries(response.errors).forEach(([field, messages]) => {
        messages.forEach((message) => {
          toast.add(message, {
            icon: "i-icon-park-outline-error", // Custom icon
          });
        });
      });
    } else if (response.message) {
      // Handle generic error message
      toast.add(response.message, {
        icon: "i-icon-park-outline-error", // Custom icon
      });
    } else {
      // Handle unknown error structure
      toast.add("An unknown error occurred. Please try again.", {
        icon: "i-icon-park-outline-error", // Custom icon
      });
    }
  };

  return {
    handleBackendErrors,
  };
};
