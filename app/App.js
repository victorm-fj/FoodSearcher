import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          React Native local SQlite3 USDA foods database
        </Text>
        <Text style={styles.text}>
          react-native-sqlite-storage implementation
        </Text>
      </View>
    );
  }
}

export default App;
