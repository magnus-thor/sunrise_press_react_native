import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "./Components/HomeScreen";
import Article from "./Components/Article";

const NavStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Article: { screen: Article }
});

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;
