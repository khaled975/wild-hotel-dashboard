import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Login as LoginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (user) => {
      //   console.log(user);
      // localStorage.setItem("user", JSON.stringify(user));
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("the provided email or password is incorrect");
    },
  });
  return { login, isLoading };
}
