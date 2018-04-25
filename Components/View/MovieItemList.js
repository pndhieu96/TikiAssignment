import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

export default class MovieItemList extends Component {
  render() {

  	const{ wrap, thumbnail, content, title, sub } = styleMoveItem;

    return (
     	<View style={wrap}>
			<Image source={{uri: this.props.uril}}
				style={thumbnail} 
			/>
			<View style={content} >
				<Text style={title} >{this.props.title.toUpperCase()}</Text>
				<Text style={sub} >Năm sản xuất: {this.props.year}</Text>
				<Text style={sub} >ImdbID: {this.props.imdbID}</Text>
			</View>
		</View>
    );
  }
}

const styleMoveItem = StyleSheet.create({
	wrap: {
		margin: 5,
		borderWidth:1,
		flexDirection: 'row',
		backgroundColor: '#1c1c1c'
	},
	thumbnail: {
		width: 80,
		height: 100
	},
	content: {
		margin: 10,
		flex: 1
	},
	title: {
		color: '#44e2ff',
		fontSize: 13,
		fontWeight: '700',
		paddingBottom: 10
	},
	sub: {
		color: '#fff',
		paddingBottom: 5
	}
});



