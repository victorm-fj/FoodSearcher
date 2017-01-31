import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import FoodList from './components/FoodList';

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
    marginBottom: 15,
  },
  input: {
    width: 250,
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});


// error callback function for openDatabase operation
const errorCB = (err) => {
  console.log(`SQL Error: ${err}`);
};

// success callback function for openDatabase operation
const successCB = () => {
  console.log('SQL executed fine');
};

const db = SQLite.openDatabase({
  name: 'foodsDB', readOnly: true, createFromLocation: 1,
}, successCB, errorCB);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      foods: [],
    };
  }

  // onChangeTextHandler arrow function (automatically binds context)
  onChangeTextHandler = (text) => {
    this.setState({ value: text });
    this.searchFood(text);
  }

  searchFood = (food) => {
    // retireved foods will be pushed into this array
    const foodsArray = [];

    // regex that indicates a string containing substring (searchTerm)
    const searchTerm = `%${food}%`;
    // search limit
    const limit = 20;
    // search offset
    const offset = 1;
    // LIKE means we're not doing an exact match (column = value),
    // but doing some more fuzzy matching.
    const query = `SELECT * FROM food WHERE desc LIKE '${searchTerm}' LIMIT ${limit} OFFSET ${offset}`;

    db.executeSql(query, [],
    (results) => {
      // console.log(results);
      // length of results
      const length = results.rows.length;

      let i = 0;
      // iterate over results.rows.item
      for (; i < length; i += 1) {
        // console.log(results.rows.item(i));
        // push every object to foodsArray
        foodsArray.push(results.rows.item(i));
      }

      // if food searchTerm equals to empty string, set state.food to an empty array
      if (food === '') {
        this.setState({ foods: [] });
      } else {
        // set state.food to query results pushed in foodsArray
        // console.log(foodsArray);
        this.setState({ foods: foodsArray });
      }
    },
    (error) => {
      console.log(error);
    });
  }

  render() {
    console.log(this.state);
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

        <FoodList foods={this.state.foods} />
      </View>
    );
  }
}

export default App;
