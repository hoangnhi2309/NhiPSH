import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';

import Loading from './LoadingComponent';

function History() {
  return (
    <Card containerStyle={[styles.card, styles.cardTop]}>
      <Card.Title style={styles.cardTitle}>Our History</Card.Title>
      <Card.Divider />
      <Text style={styles.historyText}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of world
        fusion cuisine that can be found nowhere else, it enjoys patronage from
        the A-list clientele in Hong Kong. Featuring four of the best three-star
        Michelin chefs in the world, you never know what will arrive on your plate
        the next time you visit us.{'\n'}{'\n'}
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for the
        first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders || {}
  }
};

class RenderLeadership extends Component {
  renderLeaderItem = ({ item }) => {
    if (!item) return null;
    return (
      <ListItem containerStyle={{ paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 0 }}>
        <View style={styles.row}>
          <Avatar rounded source={{ uri: baseUrl + item.image }} />
          <View style={styles.content}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>{item.description}</Text>
          </View>
        </View>
      </ListItem>
    );
  };

  render() {
    const { leaders, isLoading, errMess } = this.props;

    if (isLoading) {
      return (
        <Card containerStyle={[styles.card, styles.cardBottom]}>
          <Card.Title style={styles.cardTitle}>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (errMess) {
      return (
        <Card containerStyle={[styles.card, styles.cardBottom]}>
          <Card.Title style={styles.cardTitle}>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10, color: 'red' }}>{errMess}</Text>
        </Card>
      );
    } else {
      const data = Array.isArray(leaders) ? leaders : [];
      return (
        <Card containerStyle={[styles.card, styles.cardBottom]}>
          <Card.Title style={styles.cardTitle}>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList
            data={data}
            renderItem={this.renderLeaderItem}
            keyExtractor={(item, index) => {
              if (!item) return index.toString();
              if (item.id === 0 || item.id) return item.id.toString();
              if (item._id) return item._id.toString();
              return item.name ? `${item.name.replace(/\s+/g, '_')}_${index}` : index.toString();
            }}
          />
        </Card>
      );
    }
  }
}

class About extends Component {
  constructor(props) {
    super(props);
  }

  renderLeader = ({ item }) => null; // kept for compatibility (not used)

  render() {
    const leadersState = this.props.leaders || {};
    const leadersArray = Array.isArray(leadersState.leaders) ? leadersState.leaders : [];

    return (
      <ScrollView contentContainerStyle={styles.scrollBody}>
        <History />

        <RenderLeadership
          leaders={leadersArray}
          isLoading={leadersState.isLoading}
          errMess={leadersState.errMess}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollBody: { paddingBottom: 24 },
  card: {
    margin: 10,
  },
  cardTop: { marginTop: 10 },
  cardBottom: { marginBottom: 24 },
  cardTitle: { textAlign: 'center', fontSize: 16 },
  historyText: { margin: 8, fontSize: 14, lineHeight: 15 },
  listWrapper: { paddingHorizontal: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  content: { marginLeft: 8, flex: 1 },
  itemContainer: { paddingVertical: 8, paddingHorizontal: 4 },
  itemTitle: { fontSize: 16, marginBottom: 2, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, lineHeight: 16, color: '#666' },
});

export default connect(mapStateToProps)(About);
export { History };