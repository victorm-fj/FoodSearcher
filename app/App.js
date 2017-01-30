import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchBar: {
    flexDirection: 'row',
    height: 56,
    width: 500,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
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
  input: {
    width: 250,
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  // onChangeTextHandler arrow function (automatically binds context)
  onChangeTextHandler = (text) => {
    this.setState({ value: text });
  }

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
        <View style={styles.searchBar}>
          <Icon
            size={18}
            name="search"
            color="#fff"
          />
          <TextInput
            value={this.state.value}
            onChangeText={this.onChangeTextHandler}
            style={styles.input}
            underlineColorAndroid="#fff"
          />
        </View>

        <Text style={styles.title}>
          React Native local SQlite3 USDA foods database
        </Text>
        <Text style={styles.text}>
          react-native-sqlite-storage implementation
        </Text>
        <Text style={styles.text}>
          {this.state.value}
        </Text>
      </View>
    );
  }
}

export default App;
