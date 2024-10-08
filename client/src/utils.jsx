import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  console.log("succcess");

  toast.success(msg, {
    position: "top-right",
    autoClose: 3000, // Close after 3 seconds
    onClose: () => console.log("Toast closed"),
  });
};

export const handleError = (msg) => {
  console.log("failure");

  toast.error(msg, {
    position: "top-right",
    autoClose: 3000, // Close after 3 seconds
    onClose: () => console.log("Toast closed"),
  });
};
