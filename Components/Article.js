import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Image } from "react-native-elements";
import { GetArticle } from "../services/fetchArticles";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.navigation.state.params.articleID,
      article: {
        id: 0,
        title: "",
        description: "",
        content: "",
        image: "",
        category: {
          name: ""
        }
      }
    };
  }

  componentDidMount() {
    GetArticle(this.state.articleId).then(article => {
      this.setState({
        article: {
          id: article.id,
          title: article.title,
          description: article.description,
          content: article.content,
          image: article.image,
          category: {
            name: article.category.name
          }
        }
      });
    });
    console.log("Articles Component did mount");
  }

  render() {
    return (
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.state.article.image }}
        />
        <Text>{this.state.article.category.name}</Text>
        <Text>{this.state.article.title}</Text>
        <Text>{this.state.article.description}</Text>
        <Text>{this.state.article.content}</Text>
      </View>
    );
  }
}
