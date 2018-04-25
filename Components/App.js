import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import ListMovie from "./View/ListMovie.js";
import MovieDetail from "./View/MovieDetail.js";

const navigatorScreen = StackNavigator({
	Home: { screen: ListMovie },
	detail: { screen: MovieDetail },
},
{
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
	}
}
);

export default navigatorScreen;



