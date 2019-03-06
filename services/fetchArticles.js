import axios from "axios";

export const getArticles = async () => {
  // const url = `http://192.168.1.178:3000/api/articles`;
  const url = `https://ca-sunrise-rn.herokuapp.com/api/articles`;
  try {
    let response = await fetch(url);
    const articles = JSON.parse(response._bodyInit)["articles"];
    return articles;
  } catch (error) {
    console.error(error);
  }
};
