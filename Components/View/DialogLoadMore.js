import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class DialogLoadMore extends Component {
  render() {

  	const{ load, text } = styleLoadMore;

    return (
    	<View style={load}>
    		<Text style={text}>Loadding...</Text>
    	</View>
    );
  }
}

const styleLoadMore = StyleSheet.create({
	load:{
		width: '100%',
		backgroundColor: 'black',
		position: 'absolute', left: 0, bottom: 50,
		zIndex: 20,
		height: 50
	},
	text:{
		color: '#fff',
		fontSize: 15,
		fontWeight: '700',
		padding:5,
		textAlign: 'center',
	}
})
