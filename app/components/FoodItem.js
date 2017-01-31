import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    margin: 5,
  },
});

const FoodItem = ({ food }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {food.desc}
      </Text>
    </View>
  );
};

export default FoodItem;
