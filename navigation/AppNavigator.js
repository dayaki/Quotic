import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Landing from "../screens/Landing";
import Quotes from "../screens/Quotes";
import Likes from "../screens/Likes";

const HomeStack = createStackNavigator(
  {
    Quotes,
    Landing: Landing,
    Likes
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Main: HomeStack
  })
);
