'use strict';

import React, { Component } from 'react';
import {

  View,
  Text,
} from 'react-native';


class PhotoPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
      // setTimeout(() => {
      //   navigator.replace({
      //     id: 'LoginPage',
      //   });
      // }, 1000);//need to only run this on launch
    }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black', fontSize: 32,}}>PhotoPage!</Text>
      </View>
    );
  }
}

module.exports = PhotoPage;
