import React, { Component } from 'react';
import {
  View,
  ListView,
} from 'react-native';

import FoodItem from './FoodItem';

class FoodList extends Component {
  // before component mounts, create list data source
  componentWillMount() {
    this.createDataSource(this.props);
  }

  // as soon as props passed down by parent change, crate new
  // data source with these updated props
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  // create ListView datasource
  createDataSource({ foods }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(foods);
  }

  // render rows for each object in the array foods
  // pass food as a prop to FoodItem
  renderRow(food) {
    return <FoodItem food={food} />;
  }

  render() {
    const { foods } = this.props;

    if (foods.length === 0) {
      return <View />;
    }

    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ flex: 1 }}
      />
    );
  }
}

export default FoodList;
