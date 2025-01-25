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