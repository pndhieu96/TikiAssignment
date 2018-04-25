import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import girdIcon from '../Media/ic_border_all_white_24dp.png';
import listIcon from '../Media/ic_format_align_justify_white_24dp.png';
import MovieItemList from './MovieItemList.js';
import MovieItemGrid from './MovieItemGrid.js';
import DialogLoadMore from './DialogLoadMore.js';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
	
export default class ListMovie extends Component {

	constructor(props){
		super(props);
		
		this.state={
			dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
			isLoading: true,
			refreshing: false,
			isGrid: true,
			isDialogLoadMore: false,
			page:1
		};
	}


	render() {

		const { listviewGrid, listviewList, container, toolbar, toolbarTitle, touchGridItem } = styleIndex;
		const { navigate } = this.props.navigation;

		if(this.state.isLoading){
			return(
				<View style={{flex: 1, paddingTop: height/1.8}}>
				  <ActivityIndicator/>
				</View>
			)
	    }

		return (
			<View style={container} >
				<View style={toolbar}>
					<Text style={toolbarTitle}>
						Phim về Batman
					</Text>

					<TouchableOpacity onPress={()=>{
						{
							this.state.isGrid
							?
							this.setState({ isGrid : false })
							:
							this.setState({ isGrid : true })
						}

						this._onRefresh()
					}}>
						{
							this.state.isGrid
							?
							<Image source={listIcon}/>
							:
							<Image source={girdIcon}/>
						}
					</TouchableOpacity>
				</View>

				{
					this.state.isGrid

					?

					<ListView
						onEndReached={this._onEndReached.bind(this)}
						onEndReachedThreshold={10}

						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh.bind(this)}
							/>
						}

						dataSource={this.state.dataSource}
						renderRow={(row)=>

							<View style={touchGridItem}>
								<TouchableOpacity onPress={()=>{
									this.nextToMovieDetail(navigate, row)
								}}>
									<MovieItemGrid
										uril = {row.Poster}
										title = {row.Title}
										year = {row.Year}
										imdbID = {row.imdbID}
									 />
								 </TouchableOpacity>
							 </View>
						}

						contentContainerStyle={listviewGrid}
					/>

					:

					<ListView
						onEndReached={this._onEndReached.bind(this)}
						onEndReachedThreshold={10}

						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh.bind(this)}
							/>
						}

						dataSource={this.state.dataSource}
						renderRow={(row)=>
							<TouchableOpacity onPress={()=>{
								this.nextToMovieDetail(navigate, row)
							}}>
								<MovieItemList
									uril = {row.Poster}
									title = {row.Title}
									year = {row.Year}
									imdbID = {row.imdbID}
								 />
							</TouchableOpacity>

						}
					/>
				}
				
				{this.state.isDialogLoadMore ? <DialogLoadMore /> : null }

			</View>
		);
	}


	componentDidMount(){
		this.getDatafromJson(1, false);
	}


	_onRefresh(){
		console.log("_onRefresh");

		this.setState({
			refreshing:true,
		});

		this.getDatafromJson(1, false);
	}


	_onEndReached(){
		console.log("_onEndReached");

		this.setState({
			isDialogLoadMore: true
		});

		const page = this.state.page + 1;
		this.getDatafromJson(page, true);
	}	


	nextToMovieDetail = (navigate, row) => {
		console.log('click item');

		navigate('detail',{
			title : row.Title,
			imdbID : row.imdbID
		});
	}


	getDatafromJson = (page,isLoadMore) => {
		fetch("http://www.omdbapi.com/?s=Batman&apikey=2002c228&page=" + page)
		.then((response)=>response.json())
		.then((responseJson)=>{
			if(isLoadMore == true){
				if(responseJson.Response == "True"){

					mang = mang.concat(responseJson.Search);
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(mang),
						page: this.state.page + 1,
						isLoading: false,
						isDialogLoadMore: false
					});

					console.log("Page: " + this.state.page);
				}else{
					Alert.alert(
					  'Thông báo',
					  'Đã hết dữ liệu !',
					  [
					    {text: 'OK', onPress: () => console.log('OK Pressed')},
					  ],
					  { cancelable: false }
					)
				}
			}else{
				mang = responseJson.Search
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseJson.Search),
					refreshing: false,
					isLoading: false,
					page: 1
				})
			}
			
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
				isLoading: false,
				refreshing: false,
				isDialogLoadMore: false,
				page:1
			})
		});
	}	
	
}

const styleIndex = StyleSheet.create({
	container:{
		backgroundColor: '#555458'
	},
	toolbar:{
		height: height / 12,
		backgroundColor: '#2f2d2e',
		padding: 10,
		flexDirection: 'row', 
		justifyContent:'space-between'
	},
	toolbarTitle:{
		color: '#ffffff', 
		fontSize: 20, 
		textAlignVertical: 'center'  
	},
	listviewGrid: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	    flexWrap: 'wrap',
	},
	touchGridItem:{
		margin: ((width/2) - (width/2.2))/2,
		borderWidth:1,
		backgroundColor: '#1c1c1c',
		width : width/2.2,
		height : height/2.5
	}
});

