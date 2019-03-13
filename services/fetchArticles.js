import axios from "axios";

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
    let response = await axios.get(url + "/api/articles/" + id);
    const article = response.data.article;
    return article;
  } catch (error) {
    console.error(error);
  }
};
