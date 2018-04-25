import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import App from "./Components/App.js";

export default class tikiApp extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('tikiApp', () => tikiApp);
