import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toastr = ({ message = "", type = "error" }) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
  });
};


export const validateForm = (eventForm) => {
  if (!eventForm?.title) {
    Toastr({ message: "Title is required", type: "warning" });
    return false;
  }
  if (!eventForm?.description) {
    Toastr({ message: "Description is required", type: "warning" });
    return false;
  }
  if (!eventForm?.start_time) {
    Toastr({ message: "Start time is required", type: "warning" });
    return false;
  }
  if (!eventForm?.end_time) {
    Toastr({ message: "End time is required", type: "warning" });
    return false;
  }
  if (!eventForm?.location) {
    Toastr({ message: "Location is required", type: "warning" });
    return false;
  }
  return true;
};