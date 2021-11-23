import axios from "axios";

const api = process.env.REACT_APP_API;
export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${api}/auth/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async(authtoken)=>{
  return await axios.post(
    `${api}/auth/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}

export const currentAdmin = async(authtoken)=>{
  return await axios.post(
    `${api}/auth/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
}