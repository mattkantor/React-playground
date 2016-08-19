'use strict';

import React, { Component } from 'react';
import {

  View,
  Text,
} from 'react-native';

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    console.log("going");
    return fetch('http://localhost:3000/api/v1/participants/all.json',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log( responseData);//load data and update the tables
    }).then((response)=> {
      setTimeout(() => {
        navigator.replace({
          id: 'LoginPage',
        });
      }, 1000);
    }).catch((error) => {
        console.error(error);
      });



  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Splash!</Text>
      </View>
    );
  }
}

module.exports = SplashPage;
