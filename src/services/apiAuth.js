import supabase, { supabaseUrl } from "./supabase";

// >>>>>>>> SIGN UP
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

// >>>>>>>> FIRST WAY TO LOGIN
// export async function Login({ email, password }) {
//   try {
//     const {data} = await authAxios.post(`${AUTH_URL}`, { email, password });
//     // console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// >>>>>>>>>> SECOND WAY TO LOGIN

export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data);
  if (error) throw new Error(error);
  return data;
}

// CHECK IF THERE IS AUTHENTICATED USER OR NOT
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error);
  return data?.user;
}

// LOGOUT

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}

// UPDATE USER DATA {EMAIL,PASSWORD,AVATAR}
export async function updateUserData({ fullName, password, avatar }) {
  // 1. CHECK >> UPDATE FULLNAME OR PASSWORD
  let userData;
      // >>> IF USER WILL UPDATE ONLY FULLNAME
  if (fullName) userData = { data: { fullName } };
      // >>> IF USER WILL UPDATE ONLY PASSWORD
  if (password) userData = { password };

  const { data, error } = await supabase.auth.updateUser(userData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;


      // >>> IF USER UPDATES AVATAR IMG

  // UPLOAD AVATAR IMG
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarError } = await supabase.storage
    .from("avaters")
    .upload(fileName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  // UPDATE AVATAR IN USER INTERFACE
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avaters/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
