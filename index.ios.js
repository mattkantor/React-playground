import React, { Component } from 'react';
const Realm = require('realm');
const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const Person = require('./model/Person.js');
const News = require('./model/News.js');

var SplashPage = require('./components/SplashPage');
var NoNavigatorPage = require('./components/NoNavigatorPage');
var LoginPage = require('./components/LoginPage');

//const Register = require('./Register');


//const Contest = require('./Contest');
//const News = require('./News');
//const Photo = require('./Photo');


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
//export default new Realm({schema: [User]});



class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

class ninek extends Component {

  onMenuItemSelected = (item) => {
    console.log(item)
    this.refs.nav1.replace({
      id: "SplashPage",
    });
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  render() {
    let realm = new Realm({schema: [Person,News]});
    const menu =  <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu menu={menu}>
      <Navigator
           ref="nav1"
           initialRoute={{id: 'SplashPage', name: 'Index'}}
           renderScene={this.renderScene.bind(this)}
           configureScene={(route) => {
             if (route.sceneConfig) {
               return route.sceneConfig;
             }
             return Navigator.SceneConfigs.FloatFromRight;
           }} />
      </SideMenu>

    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator} />
      );
    }
    if (routeId === 'PersonPage') {
      return (
        <PersonPage
          navigator={navigator} />
      );
    }
    if (routeId === 'NoNavigatorPage') {
      return (
        <NoNavigatorPage
            navigator={navigator} />
      );
    }
    return this.noRoute(navigator);

  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ninek', () => ninek);
