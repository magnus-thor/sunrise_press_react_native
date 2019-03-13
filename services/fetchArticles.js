import axios from "axios";
import { AsyncStorage } from "react-native";

export const GetArticles = async () => {
  const url = `http://192.168.1.178:3000`;
  // const url = `https://ca-sunrise-rn.herokuapp.com`;
  try {
    let response = await axios.get(url + "/api/articles");
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error(error);
  }
};

export const GetArticle = async id => {
  const url = `http://192.168.1.178:3000`;
  // const url = `https://ca-sunrise-rn.herokuapp.com`;
  try {
    let headers = await AsyncStorage.getItem("credentials");
    headers = JSON.parse(headers);
    headers = {
      ...headers,
      "Content-type": "application/json",
      Accept: "application/json"
    };
    console.log(headers);
    // axios.defaults.headers.common["Authorization"] = headers["access_token"];
    // let ax = axios;
    // debugger;
    // AUTH_TOKEN = headers["access_token"];
    // let response = await axios.get(url + "/api/articles/" + id);
    let response = await axios.get(url + "/api/articles/" + id, {
      method: "GET",
      mode: "cors",
      headers: headers
    });
    const article = response.data.article;
    return article;
  } catch (error) {
    console.error(error);
  }
};
