import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  // COMPOUND COMPONENT PATTERN
  return (
    <div>
      <Modal>
        {/* SHOW CABIN FORM*/}
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// =>>>>>>>>>>> OLD CODE WAY  >>>>>>>>>>>>>>>>>>>>

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((show) => !show)}>
//         Add New Cabin
//       </Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onClose={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
