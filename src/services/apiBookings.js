import {
  BOOKINGS_URL,
  CREATE_CABIN_URL,
  DELETE_BOOKING_URL,
  EDIT_BOOKING_URL,
  GET_BOOKING_URL,
} from "../api/api";
import { customAxios } from "../api/customAxios";
//GET ALL Bookings DATA
export async function getBooking(bookingId) {
  console.log(bookingId);

  try {
    const data = await customAxios.get(
      `/${GET_BOOKING_URL}select=*,cabins(name),guests(*)&id=eq.${bookingId}`
    );
    return data.data;
  } catch (error) {
    throw new Error("Bookings could not loaded");
  }
}
export async function getBookings() {
  try {
    /////////// OLD_WAY
    // const data = await axios.get(`${Bookings_URL}`, {
    //   headers: {
    //     apiKey: API_KEY,
    //     Authorization: `Bearer ${API_KEY}`,
    //   },
    // });
    const data = await customAxios.get(
      `/${BOOKINGS_URL},cabins(name),guests(fullName,email)`
    );
    return data.data;
  } catch (error) {
    throw new Error("Bookings could not loaded");
  }
}


// CREATE NEW CABIN

export async function createCabin(newCabin) {
  const isImageChanged = typeof newCabin.image !== "string";

  // https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/Bookings-images/cabin-001.jpg
  const imageBaseUrl =
    "https://mbdmxjssnputgesviyjf.supabase.co/storage/v1/object/public/Bookings-images";
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

// UPDATE BOOKING

export async function editBooking(id, newEditBooking) {

  console.log(newEditBooking);
  
  try {
    await customAxios.patch(
      `/${EDIT_BOOKING_URL}id=eq.${id}`,
      newEditBooking ,
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

  return id;
}
// DELETE BOOKING
export async function deleteBookings(id) {
  try {
    await customAxios.delete(`/${DELETE_BOOKING_URL}id=eq.${id}`);
  } catch (error) {
    throw new Error("cabin could not be deleted");
  }
  return id;
}