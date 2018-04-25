import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  Image ,
  StyleSheet,
  Dimensions
} from 'react-native';

import backIcon from '../Media/ic_arrow_back_white_24dp.png';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class MovieDetail extends Component {

	constructor(props){
		super(props);
		
		this.state={
			refreshing: false,
			data : ''
		};
	}

	render() {

		const {
		 container, toolbar, toolbarTitle, wrap, thumbnail, content, title, year, 
		 contentBox, contentText, description, desText, desTitle
		} = styleDetail;

		if(this.state.isLoading){
			return(
				<View style={{flex: 1, paddingTop: height/1.8}}>
				  <ActivityIndicator/>
				</View>
			)
	    }

		return (

			<View style={container}>
				<View style={toolbar}>
					<TouchableOpacity onPress={()=>{
						this.props.navigation.navigate('Home')		
					}}>
						{
							<Image source={backIcon} />
						}
					</TouchableOpacity>

					<Text style={toolbarTitle}>
						Thông tin chi tiết
					</Text>

				</View>

				<View style={wrap}>
					<View>
						<Image source={{uri: this.state.data.Poster}}
						style={thumbnail} 
					/>
					</View>
					<View style={content}>
						<Text style={title}>{this.state.data.Title}</Text>
						<Text style={year}>{this.state.data.Year}</Text>

						<View style={contentBox}>
							<Text style={contentText}>Thời gian: {this.state.data.Runtime}</Text>
							<Text style={contentText}>Quốc gia: {this.state.data.Country}</Text>
							<Text style={contentText}>Thể loại: {this.state.data.Genre}</Text>
							<Text style={contentText}>Đạo diễn: {this.state.data.Director}</Text>
							<Text style={contentText}>Diễn viên: {this.state.data.Actors}</Text>
						</View>
					</View>
				</View>

				<View style={description}>
					<Text style={desTitle}>Nội dung phim</Text>
					<Text style={desText}>
						{this.state.data.Plot}
					</Text>
				</View>
			</View>
		  
		);
	}

	componentDidMount(){

		this.setState({
			refreshing : true,
		});

		const title = this.props.navigation.state.params.title;
		const idmId = this.props.navigation.state.params.imdbID;

		console.log(title);
		console.log(idmId);

		this.getDetailMovie(title, idmId);

	}

	getDetailMovie = (title, idmId) => {
		fetch("http://www.omdbapi.com/?t=" + title +"&i=" + idmId + "&apikey=2002c228")
		.then((response)=>response.json())
		.then((responseJson)=>{
		
			console.log(responseJson);

			this.setState({
				refreshing : false,
				data : responseJson
			});

		})
		.catch((error)=>{
			console.log(error);

			Alert.alert(
			  'Thông báo',
			  'Có lỗi xảy ra: ' + error ,
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)

			this.setState({
				refreshing : false,
			});
		});
	}
}

const styleDetail = StyleSheet.create({
	container:{
		backgroundColor: '#555458',
		flex:1
	},
	toolbar:{
		height: height / 12,
		backgroundColor: '#2f2d2e',
		padding: 10,
		flexDirection: 'row', 
	},
	toolbarTitle:{
		color: '#ffffff', 
		fontSize: 20, 
		textAlignVertical: 'center',
		paddingLeft: 20
	},
	wrap:{
		margin: 5,
		flexDirection: 'row',
		backgroundColor: '#1d1d1d'
	},
	thumbnail:{
		width: width / 3,
		height: height / 2.8
	},
	content:{
		flex: 1,
		paddingLeft: 5,
		paddingRight: 5
	},
	title:{
		color: '#dacb46',
		fontSize: 15,
		fontWeight: '700',
	},
	year:{
		color: '#999999',
	},
	contentText:{
		color: '#999999',
		paddingBottom: 5
	},
	contentBox:{
		backgroundColor: '#222222',
		borderWidth: 1,
		borderColor: '#000000',
		padding: 5,
		marginTop: 5,
		marginBottom: 5
	},
	description:{
		margin: 5,
		padding: 5,
		backgroundColor: '#1d1d1d'
	},
	desText:{
		color: '#999999',
		paddingBottom: 5
	},
	desTitle: {
		color: '#dacb46',
		fontSize: 15,
		fontWeight: '700',
	}
});


