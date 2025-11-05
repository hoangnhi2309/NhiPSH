import React, { Component } from 'react';
import { View, ScrollView, Text, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

// redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';

import Loading from './LoadingComponent';

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
    // handle loading / error passed from parent
    if (this.props.isLoading) {
      return (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>{this.props.title || ''}</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>{this.props.title || ''}</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 16, color: 'red' }}>{this.props.errMess}</Text>
        </Card>
      );
    }

    const item = this.props.item;
    if (!item) return <View />;

    return (
      <Card containerStyle={styles.card}>
        {item.image ? (
          <ImageBackground
            source={{ uri: baseUrl + item.image }}
            style={styles.image}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>
              {item.designation ? <Text style={styles.designation}>{item.designation}</Text> : null}
            </View>
          </ImageBackground>
        ) : (
          <Text style={styles.title}>{item.name}</Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </Card>
    );
  }
}

class Home extends Component {
  render() {
    // safe access to arrays inside reducer objects
    const dishesArr = (this.props.dishes && Array.isArray(this.props.dishes.dishes))
      ? this.props.dishes.dishes
      : [];
    const promosArr = (this.props.promotions && Array.isArray(this.props.promotions.promotions))
      ? this.props.promotions.promotions
      : [];
    const leadersArr = (this.props.leaders && Array.isArray(this.props.leaders.leaders))
      ? this.props.leaders.leaders
      : [];

    const dish = dishesArr.find(d => d && d.featured) || null;
    const promo = promosArr.find(p => p && p.featured) || null;
    const leader = leadersArr.find(l => l && l.featured) || null;

    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <RenderItem
          title="Dish"
          item={dish}
          isLoading={this.props.dishes && this.props.dishes.isLoading}
          errMess={this.props.dishes && this.props.dishes.errMess}
        />
        <RenderItem
          title="Promotion"
          item={promo}
          isLoading={this.props.promotions && this.props.promotions.isLoading}
          errMess={this.props.promotions && this.props.promotions.errMess}
        />
        <RenderItem
          title="Leader"
          item={leader}
          isLoading={this.props.leaders && this.props.leaders.isLoading}
          errMess={this.props.leaders && this.props.leaders.errMess}
        />
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