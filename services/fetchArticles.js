import axios from "axios";

export const getArticles = async () => {
  // const url = `http://192.168.1.178:3000`;
  const url = `https://ca-sunrise-rn.herokuapp.com`;
  try {
    let response = await axios.get(url + "/api/articles");
    const articles = response.data.articles;
    return articles;
  } catch (error) {
    console.error(error);
  }
};
