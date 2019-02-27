import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List, ListItem, Image } from "react-native-elements";
import { getArticles } from "./services/fetchArticles";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesFetched: false
    };
  }

  updateStateHandler(articles) {
    this.setState({
      articles: articles,
      articlesFetched: true
    });
  }

  componentDidMount() {
    getArticles().then(res => {
      this.updateStateHandler(res);
    });
  }

  renderArticles(item) {
    const article = item.item;
    // if (this.state.articlesFetched) {
    return (
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: article.image }}
        />
        <Text>{article.category.name}</Text>
        <Text>{article.title}</Text>
        <Text>{article.description}</Text>
      </View>
    );
    // } else {
    //   return (
    //     <View>
    //       <Text>NO Articles</Text>
    //     </View>
    //   );
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <List>
          <FlatList
            data={this.state.articles}
            renderItem={this.renderArticles.bind(this)}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
