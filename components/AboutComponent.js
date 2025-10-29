import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';

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
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
  }

  renderLeader = ({ item }) => (
    <ListItem containerStyle={{ paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 0 }}>
      <View style={styles.row}>
      <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.itemSubtitle}>
            {item.description}
          </ListItem.Subtitle>
        </ListItem.Content>
      </View>
    </ListItem>
  );
  

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollBody}>
        <History />

        <Card containerStyle={[styles.card, styles.cardBottom]}>
          <Card.Title style={styles.cardTitle}>Corporate Leadership</Card.Title>
          <Card.Divider />
            <FlatList
              data={this.props.leaders.leaders}
              renderItem={this.renderLeader}
              keyExtractor={(item) => item.id.toString()}
            />
        </Card>
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
  content: { marginLeft: 8 },
  itemContainer: { paddingVertical: 8, paddingHorizontal: 4 },
  itemTitle: { fontSize: 16, marginBottom: 2 },
  itemSubtitle: { fontSize: 14, lineHeight: 16, color: '#666' },
});

export default connect(mapStateToProps)(About);
export { History };
