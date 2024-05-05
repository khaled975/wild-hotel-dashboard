import {
  CABINS_URL,
  CREATE_CABIN_URL,
  DELETE_CABIN_URL,
  EDIT_CABIN_URL,
} from "../api/api";
import { customAxios } from "../api/customAxios";
//GET ALL CABINS DATA
export async function getCabins() {
  try {
    /////////// OLD_WAY
    // const data = await axios.get(`${CABINS_URL}`, {
    //   headers: {
    //     apiKey: API_KEY,
    //     Authorization: `Bearer ${API_KEY}`,
    //   },
    // });
    const data = await customAxios.get(`/${CABINS_URL}`);
    return data.data;
  } catch (error) {
    throw new Error("cabins could not loaded");
  }
}
// DELETE CABIN
export async function deleteCabin(cabinId) {
  try {
    await customAxios.delete(`/${DELETE_CABIN_URL}id=eq.${cabinId}`);
  } catch (error) {
    throw new Error("cabin could not be deleted");
  }
}

// CREATE NEW CABIN

export async function createCabin(newCabin) {
  const isImageChanged = typeof newCabin.image !== "string";

  // https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
  const imageBaseUrl =
    "https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/cabins-images";
  const imageName = isImageChanged
    ? newCabin.image.name.replaceAll("/", "")
    : newCabin.image.replace(imageBaseUrl, "");
  const imagePath = `${imageBaseUrl}/${imageName}`;
  try {
    await customAxios.post(
      `/${CREATE_CABIN_URL}`,
      { ...newCabin, image: imagePath },
      {
        Headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
      }
    );
  } catch (error) {
    throw new Error("cabin could not be created");
  }
}

// UPDATE CABIN

export async function editCabin(newEditCabin, id) {
  const isImageNotChanged = typeof newEditCabin.image !== "string";

  // https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
  const imageBaseUrl =
    "https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/cabins-images";
  const imageName =
    isImageNotChanged && newEditCabin.image.name.replaceAll("/", "");
  const imagePath = isImageNotChanged
    ? `${imageBaseUrl}/${imageName}`
    : newEditCabin.image;
  try {
    await customAxios.patch(
      `/${EDIT_CABIN_URL}id=eq.${id}`,
      { ...newEditCabin, image: imagePath },
      {
        Headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
      }
    );
  } catch (error) {
    throw new Error("cabin could not be created");
  }
}
