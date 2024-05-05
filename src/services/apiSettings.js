import { SETTINGS_URL, UPDATE_SETTINGS_URL } from "../api/api";
import { customAxios } from "../api/customAxios";

export async function getSettings() {
  // const [isLoading,setIsLoading]=useState(false)
  try {
    const data = await customAxios.get(`/${SETTINGS_URL}`);
    // console.log(data.data);

    return data.data[0];
  } catch (error) {
    throw new Error("Settings data could not be fetched");
  }
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  console.log(newSetting);
  
  try {
    await customAxios.patch(
      `/${UPDATE_SETTINGS_URL}`,
       newSetting ,
      {
        Headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
      }
    );
  } catch (error) {
    throw new Error("Settings could not be updated ❌");
  }
}
