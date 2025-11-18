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
  render() {
    if (this.props.dishes.isLoading) {
        return (<Loading />);
    } else if (this.props.dishes.errMess) {
        return (<Text>{this.props.errMess}</Text>);
    } else {
        return (
          <FlatList
            data={this.props.dishes.dishes}
            renderItem={this.renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
          />
        );
      }
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
}
export default connect(mapStateToProps)(Menu);
