import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "New user successfully created, Please verify your account by clicking the link that we sent to your email box"
      );
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { signUp, isLoading };
}
