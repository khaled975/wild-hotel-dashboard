import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { id } = useParams();
  console.log(id);

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { booking, isLoading };
}
