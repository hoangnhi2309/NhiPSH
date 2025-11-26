import React, { Component } from 'react';
import { View, ScrollView, Text, ImageBackground, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
// redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    // tolerate different reducer key names and provide safe defaults
    dishes: state.dishes || state.dish || {},
    promotions: state.promotions || state.promotion || {},
    leaders: state.leaders || state.leader || {}
  };
};

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card containerStyle={styles.card}>
            <ImageBackground
              source={{ uri: baseUrl + item.image }}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.name}</Text>
                {item.designation ? (
                  <Text style={styles.designation}>{item.designation}</Text>
                ) : null}
              </View>
            </ImageBackground>
            <Text style={styles.description}>{item.description}</Text>
          </Card>
        );
      }
      return (<View />);
    }
  }
}

class Home extends Component {
  render() {
    const { dishes, promotions, leaders } = this.props;

    const asArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (Array.isArray(val.dishes)) return val.dishes;
      if (Array.isArray(val.promotions)) return val.promotions;
      if (Array.isArray(val.leaders)) return val.leaders;
      if (Array.isArray(val.items)) return val.items;
      return [];
    };

    const dishesArr = asArray(dishes);
    const promosArr = asArray(promotions);
    const leadersArr = asArray(leaders);

    const dish = dishesArr.find(d => d && d.featured) || null;
    const promo = promosArr.find(p => p && p.featured) || null;
    const leader = leadersArr.find(l => l && l.featured) || null;

    // safe isLoading / errMess extraction
    const isDishesLoading = Boolean(dishes && dishes.isLoading);
    const dishesErr = dishes && dishes.errMess;
    const isPromosLoading = Boolean(promotions && promotions.isLoading);
    const promosErr = promotions && promotions.errMess;
    const isLeadersLoading = Boolean(leaders && leaders.isLoading);
    const leadersErr = leaders && leaders.errMess;

    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderItem
            title="Dish"
            item={dish}
            isLoading={isDishesLoading}
            errMess={dishesErr}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem
            title="Promotion"
            item={promo}
            isLoading={isPromosLoading}
            errMess={promosErr}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem
            title="Leader"
            item={leader}
            isLoading={isLeadersLoading}
            errMess={leadersErr}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 20 },
  card: { margin: 10, padding: 0 },
  image: { width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' },
  imageStyle: { borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  overlay: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '700', textAlign: 'center' },
  designation: { color: '#fff', fontSize: 14, marginTop: 4 },
  description: { margin: 10, fontSize: 14, lineHeight: 18 },
  cardTitle: { textAlign: 'center', fontSize: 16 }
});

export default connect(mapStateToProps)(Home);