import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { GetArticle } from "../services/fetchArticles";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.navigation.state.params.articleID
    };
  }

  componentDidMount() {
    GetArticle(this.state.articleId);
    console.log("Articles Component did mount");
  }

  render() {
    return (
      <View>
        <Text>Hello Article</Text>
      </View>
    );
  }
}
