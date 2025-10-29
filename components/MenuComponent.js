
import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
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
        onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })} 
        bottomDivider
      >
        <Avatar source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <Text style={{ color: '#666', fontSize: 14 }}>{item.description}</Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  render() {
    const data = (this.props.dishes && Array.isArray(this.props.dishes.dishes))
      ? this.props.dishes.dishes
      : [];
    return (
      <FlatList
        data={data}
        renderItem={this.renderMenuItem}
        keyExtractor={(item, index) => {
          if (item && (item.id === 0 || item.id)) return item.id.toString();
          return index.toString();
        }}
      />
    );
  }
}
export default connect(mapStateToProps)(Menu);
