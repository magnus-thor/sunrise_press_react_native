import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { List, ListItem, Image } from "react-native-elements";
import { getArticles } from "./services/fetchArticles";
import LoginForm from "./Components/LoginForm";
import { authenticate } from "./services/Auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesFetched: false,
      renderLoginForm: false,
      email: "",
      password: "",
      message: ""
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

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
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
      </View>
    );
  }

  async onLogin(e) {
    console.log("CLICKED");
    let resp = await authenticate(this.state.email, this.state.password);
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderLoginForm: false });
    }
  }

  renderLogin() {
    let user;

    if (this.state.authenticated === true) {
      user = JSON.parse(sessionStorage.getItem("credentials")).uid;
      return <p>Hi {user}</p>;
    } else {
      if (this.state.renderLoginForm === true) {
        return (
          <View>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
              // inputChangeHandler={this.onChange.bind(this)}
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

    return <View style={styles.container}>{renderLogin}</View>;
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
