'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Carousel from '../libs/carousel-hybrid';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {size: {width: width, height: height}};
    this._onLayoutDidChange = this._onLayoutDidChange.bind(this);
  }

  _onLayoutDidChange(e) {
    let layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  }
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
      <View style={{flex: 1}} onLayout={this._onLayoutDidChange}>
        <Carousel delay={500} style={this.state.size} autoplay={false} >
            <View style={[styles.carousel_objs, {backgroundColor:'green'}, this.state.size]}><Text>Splash 1</Text></View>
            <View style={[styles.carousel_objs, {backgroundColor:'red'}, this.state.size]}><Text>Splash 2</Text></View>
            <View style={[styles.carousel_objs, {backgroundColor:'blue'}, this.state.size]}><Text>Splash 3</Text></View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carousel_objs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = SplashPage;
