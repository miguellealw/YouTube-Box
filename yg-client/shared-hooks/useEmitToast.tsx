import { toast } from "react-toastify";

const useEmitToast = () => {
  return {
    notifySuccess: toast.dark,
    notifyError: toast.dark
  };
};

export default useEmitToast;
