import React, { Component } from "react";
import { View, WebView, TouchableOpacity, Text } from "react-native";
import { Container, Header, Button, Icon, Fab } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";

export default class App extends Component {
  state = {
    visible: true,
    active: "true",
    currentState: "https://computers.pk/orders-pk/",
    url: "https://computers.pk/orders-pk/"
  };
  loadStart() {
    this.setState({
      visible: true
    });
  }
  loadEnd() {
    this.setState({
      visible: false
    });
  }
  onNavigationStateChange(navState) {
    this.setState({
      currentState: navState.url
    });
  }
  goBack() {
    this.webview.goBack();
  }
  displayBack() {
    if (this.state.url === this.state.currentState) {
    } else {
      if (!this.state.visible) {
        return (
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#fdd700" }}
            position="bottomLeft"
            onPress={this.goBack.bind(this)}
          >
            <Icon name="arrow-back" />
          </Fab>
        );
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textStyle={{ color: "#FFFFFF" }} />
        <WebView
          ref={el => {
            this.webview = el;
          }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{
            uri: this.state.url
          }}
          onLoadStart={this.loadStart.bind(this)}
          onLoadEnd={this.loadEnd.bind(this)}
          scalesPageToFit={false}
        />
        {this.displayBack()}
      </View>
    );
  }
}
