'use strict';

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
const Realm = require('realm');
const News = require('../model/News.js');

class NewsPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    console.log("news page");
  }
  render() {
    let realm = new Realm({schema: [News]});
    let news = realm.objects('News');
    console.log("news rebder");
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
          {
          news.map(function(item, index){
            return (
             //doesn't work hehre
                <Text key={index}>{item.title}</Text>

            )
          })
        }

      </View>
    )
  }
}
module.exports = NewsPage;
