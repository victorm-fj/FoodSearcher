import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

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
  // error callback function for openDatabase operation
  errorCB = (err) => {
    console.log(`SQL Error: ${err}`);
  }

  // success callback function for openDatabase operation
  successCB = () => {
    console.log('SQL executed fine');
  }

  render() {
    const db = SQLite.openDatabase({
      name: 'foodsDB', readOnly: true, createFromLocation: 1,
    }, this.successCB, this.errorCB);

    // 'food' being table name, item(0) is column names
    // so we set limit 2 to retrieve the first food values
    db.executeSql('SELECT * FROM food LIMIT 2', [],
    (results) => {
      console.log(results.rows.item(1));
    },
    (error) => {
      console.log(error);
    });

    // sql query that counts db rows
    db.executeSql('SELECT count(*) AS mycount FROM food', [],
    (rs) => {
      console.log(`Record count (expected to be 8791): ${rs.rows.item(0).mycount}`);
    },
    (error) => {
      console.log(`SELECT SQL statement ERROR: ${error.message}`);
    });

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
