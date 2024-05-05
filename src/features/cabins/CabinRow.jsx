import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import {
  HiDocumentDuplicate,
  HiEllipsisVertical,
  HiMiniPencilSquare,
  HiTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    image,
    maxCapacity,
    regularPrice,
    discount,
    name,
    description,
  } = cabin;
  // DELETE CABIN
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });
  // DUPLICATE CABIN
  const { isCreating, createCabin } = useCreateCabin();

  function handelDuplicateCabin() {
    createCabin(
      {
        name: `Copy of ${name}`,
        image,
        maxCapacity,
        regularPrice,
        discount,
        description,
      },
      {
        onSuccess: (data) => console.log(data),
      }
    );
  }
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{regularPrice}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle icon={<HiEllipsisVertical />} id={cabinId} />

              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiDocumentDuplicate />}
                  onClick={handelDuplicateCabin}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiMiniPencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <CreateCabinForm editData={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="Cabins"
                  onConfirm={() => mutate(cabinId)}
                  disabled={isLoading}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;
