import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      editBooking(bookingId, { status: "checked-out" }),
    onSuccess: (id) => {
      toast.success(`booking #${id} successfully checked out ✔`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error("there was an error while checking out booking");
    },
  });
  return { checkOut, isCheckingOut };
}
