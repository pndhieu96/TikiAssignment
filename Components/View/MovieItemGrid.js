import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class MovieItemGrid extends Component {
  render() {

  	const{ wrap, thumbnail, content, title, sub } = styleMoveItem;

    return (
     	<View style={wrap}>
			<Image source={{uri: this.props.uril}}
				style={thumbnail} 
			/>
			<View style={content} >
				<Text style={title} >{this.props.title.toUpperCase()} - {this.props.year}</Text>
				<Text style={sub} >Năm sản xuất: {this.props.year}</Text>
				<Text style={sub} >ImdbID: {this.props.imdbID}</Text>
			</View>
		</View>
    );
  }
}

const styleMoveItem = StyleSheet.create({
	wrap: {
		borderWidth:1,
		backgroundColor: '#1c1c1c',
		width : width/2.2,
		height : height/2.5
	},
	thumbnail: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	    justifyContent: 'center',
	    zIndex: 5
	},
	content: {
		width: '100%',
		padding: 10,
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		position: 'absolute', left: 0, bottom: 0,
		zIndex: 10
	},
	title: {
		color: '#44e2ff',
		fontSize: 12,
		fontWeight: '700',
		paddingBottom: 5,
	},
	sub: {
		color: '#fff',
		paddingBottom: 2
	}
});

