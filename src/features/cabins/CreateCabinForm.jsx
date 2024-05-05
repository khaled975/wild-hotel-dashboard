import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ editData = {}, onCloseModal }) {
  const { id: editId, ...editValues } = editData;
  const isEditClicked = Boolean(editId);
  // console.log(cabin);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditClicked ? editValues : {},
  });
  const { errors } = formState;
  // CREATE CABIN
  const { isCreating, createCabin } = useCreateCabin();

  //EDIT CABIN
  const { isEditing, editCabin } = useEditCabin();

  const isSubmitting = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditClicked)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(error) {
    // console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isSubmitting}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isSubmitting}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value you inserted is invalid",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isSubmitting}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value you inserted is invalid",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isSubmitting}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "discount must be less than price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isSubmitting}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isSubmitting}
          {...register("image", {
            required: isEditClicked ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {isEditClicked ? "Edit cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
