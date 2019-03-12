import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Image } from "react-native-elements";
import { GetArticles } from "../services/fetchArticles";
import LoginForm from "./LoginForm";
import { authenticate } from "../services/Auth";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesFetched: false,
      renderLoginForm: false,
      user: "",
      email: "",
      password: "",
      message: "",
      authenticated: false
    };
  }

  updateStateHandler(articles) {
    this.setState({
      articles: articles,
      articlesFetched: true
    });
  }

  componentDidMount() {
    GetArticles().then(res => {
      this.updateStateHandler(res);
    });
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  showArticle(id) {
    this.props.navigation.navigate("Article", {
      articleID: id
    });
  }

  renderArticles(item) {
    const article = item.item;
    return (
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: article.image }}
        />
        <Text>{article.category.name}</Text>
        <Text>{article.title}</Text>
        <Text>{article.description}</Text>
        <Button
          title="View Article"
          onPress={() => this.showArticle(article.id)}
        />
      </View>
    );
  }

  async onLogin(e) {
    let resp = await authenticate(this.state.email, this.state.password);
    if (resp.authenticated === true) {
      this.setState({ authenticated: true, user: resp.user });
    } else {
      this.setState({ message: resp.message, renderLoginForm: false });
    }
  }

  renderLogin() {
    if (this.state.authenticated === true) {
      return <Text>Hi {this.state.user}</Text>;
    } else {
      if (this.state.renderLoginForm === true) {
        return (
          <View>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
            />
          </View>
        );
      } else {
        return (
          <>
            <Button
              title="Login"
              onPress={() => this.setState({ renderLoginForm: true })}
            />
          </>
        );
      }
    }
  }

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  render() {
    let renderLogin = this.renderLogin();

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.articles}
          renderItem={this.renderArticles.bind(this)}
          keyExtractor={item => item.id.toString()}
        />
        {renderLogin}
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
