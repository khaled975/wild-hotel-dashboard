import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkingBooking, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      editBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (id) => {
      toast.success(`booking #${id} successfully checked in ✔`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (err) => {
      toast.error("there was an error while checking in booking");
    },
  });

  return { checkingBooking, isChecking };
}
