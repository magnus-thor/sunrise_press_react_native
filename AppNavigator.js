import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "./Components/HomeScreen";

const NavStack = createStackNavigator({
  Home: { screen: HomeScreen }
});

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;
