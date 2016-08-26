import React, { Component } from 'react';
import FCM from 'react-native-fcm';

const Realm = require('realm');
const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const Person = require('./model/Person.js');
const News = require('./model/News.js');
var SplashPage = require('./components/SplashPage');
var NoNavigatorPage = require('./components/NoNavigatorPage');
var LoginPage = require('./components/LoginPage');
var NewsPage = require('./components/NewsPage');
var PhotoPage = require('./components/PhotoPage');

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
  componentDidMount() {
      FCM.requestPermissions(); // for iOS
      FCM.getFCMToken().then(token => {
        console.log(token)
        // store fcm token in your server
      });
      this.notificationUnsubscribe = FCM.on('notification', (notif) => {
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      });
      this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
        console.log(token)
        // fcm token may not be available on first load, catch it here
      });

    //  FCM.subscribeToTopic('/topics/foo-bar');
    //  FCM.unsubscribeFromTopic('/topics/foo-bar');
  }
  componentWillMount(){
    let realm = new Realm({schema: [Person, News]});
    console.log("http://propellerhead.ca/data.json");
    return fetch('http://propellerhead.ca/data.json',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.questions[0].question_text);
        realm.write(() => {

        let news = realm.create('News', {
          title: responseData.questions[0].question_text,
          desc: responseData.questions[0].answer_list,
          category: "none",
          date: new Date()
        });
      });
    });
  }
  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }
  onMenuItemSelected = (item) => {
    console.log(item)
    this.refs.nav1.replace({
      id: item,
    });
    this.setState({
      isOpen: false,
      //selectedItem: item,
    });
  }

  render() {

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
    if (routeId === 'PhotoPage') {
      return (
        <PhotoPage
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
            navigator={navigator} />
      );
    }
    if (routeId === 'NewsPage') {
      return (
        <NewsPage
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
          <Text style={{color: 'red', fontWeight: 'bold'}}>I found nothing</Text>
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
