'use strict';

import React, { Component } from 'react';
import {

  View,
  Text,
} from 'react-native';

class LoginPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>Login!</Text>
      </View>
    );
  }
}

module.exports = LoginPage;
