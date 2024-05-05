import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBookings } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient()
    const {mutate:deleteBooking,isLoading:isDeleting}=useMutation({
        mutationFn:(bookingId)=>deleteBookings(bookingId),
        onSuccess:(id)=>{
            toast.success(`booking #${id} successfully deleted`)
            queryClient.invalidateQueries({active:true})
        },
        onError:()=>{
            toast.error('there was an error while deleting that booking')
        }
    })

    return{deleteBooking,isDeleting}
}