// ...existing code...
import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  }
};
class Menu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dishes: []
    // };
  }

  renderMenuItem = ({ item, index }) => {
    if (!item) return null;
    return (
      <ListItem
        onPress={() =>
          this.props.navigation.navigate('Dishdetail', { dishId: item.id })
        }
        bottomDivider
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Avatar source={{ uri: baseUrl + item.image }} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ color: '#666', fontSize: 14 }}>{item.description}</Text>
          </View>
          <ListItem.Chevron />
        </View>
      </ListItem>
    );
  };

  render() {
    // safe guards for this.props.dishes
    const dishesState = this.props.dishes || {};
    if (dishesState.isLoading) {
      return <Loading />;
    } else if (dishesState.errMess) {
      return <Text style={{ margin: 16, color: 'red' }}>{dishesState.errMess}</Text>;
    }

    const data = Array.isArray(dishesState.dishes) ? dishesState.dishes : [];

    const keyExtractor = (item, index) => {
      if (!item) return index.toString();
      if (item.id === 0 || item.id) return String(item.id);
      if (item._id) return String(item._id);
      if (item.name) return `${item.name.replace(/\s+/g, '_')}_${index}`;
      return index.toString();
    };

    // debug duplicate keys (optional)
    const keys = data.map((it, i) => keyExtractor(it, i));
    const dup = keys.find((k, i) => keys.indexOf(k) !== i);
    if (dup) {
      console.warn('Duplicate keys detected in Menu FlatList:', dup);
      console.warn(data.map(d => ({ id: d?.id, _id: d?._id, name: d?.name })));
    }

    return (
      <FlatList
        data={data}
        renderItem={this.renderMenuItem}
        keyExtractor={keyExtractor}
      />
    );
  }
}
export default connect(mapStateToProps)(Menu);
// ...existing code...