import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSetting) => updateSettingApi(newSetting),
    onSuccess: () => {
      toast.success("Settings have updated successfully ✔");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (e) => toast.error(e.message),
  });

  return { isUpdating, updateSetting };
}
