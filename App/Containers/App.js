import 'react-native-gesture-handler';
import { Component } from "react";
import { AppRegistry } from "react-native";
import Router from "@/Navigation/AppNavigation";

export default class App extends Component {
    render() {
      return <Router />;
    }
  }
  
  AppRegistry.registerComponent('TemplateApp', () => App);
  