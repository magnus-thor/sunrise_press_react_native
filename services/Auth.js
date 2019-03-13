import axios from "axios";
import { AsyncStorage } from "react-native";

const apiUrl = "http://192.168.1.178:3000";
// const apiUrl = `https://ca-sunrise-rn.herokuapp.com`;

const authenticate = async (email, password) => {
  const path = apiUrl + "/api/auth/sign_in";
  try {
    let response = await axios.post(path, {
      email: "johndoe@mail.com",
      password: "password"
    });
    await storeAuthCredentials(response);
    const user = response.data.data.name
      ? response.data.data.name
      : response.data.data.email;
    return { authenticated: true, user: user };
  } catch (error) {
    console.log(error);
    const message = error.response.data.errors[0]
      ? error.response.data.errors[0]
      : error.response.data.errors;
    return { authenticated: false, message: message };
  }
};

const storeAuthCredentials = ({ data, headers }) => {
  return new Promise(resolve => {
    const uid = headers["uid"],
      client = headers["client"],
      accessToken = headers["access-token"],
      expiry = headers["expiry"];

    AsyncStorage.setItem(
      "credentials",
      JSON.stringify({
        uid: uid,
        client: client,
        access_token: accessToken,
        expiry: expiry,
        token_type: "Bearer"
      })
    );
    AsyncStorage.setItem("current_user", JSON.stringify({ id: data.data.id }));
    resolve(true);
  });
};

export { authenticate };
