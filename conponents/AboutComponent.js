import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { LEADERS } from '../shared/leaders'; // ensure LEADERS is array with unique ids

class History extends Component {
  render() {
    return (
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.headerText}>Our History</Card.Title>
        <View style={styles.separator} />
        <Text style={styles.text}>
          Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par
          excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found
          nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four
          of the best three-star Michelin chefs in the world, you never know what will arrive on
          your plate the next time you visit us.
        </Text>

        <Text style={[styles.text, { marginTop: 12 }]}>
          The restaurant traces its humble beginnings to The Frying Pan, a successful chain started
          by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a
          pan.
        </Text>
      </Card>
    );
  }
}

class Leadership extends Component {
  render() {
    return (
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.headerText}>Corporate Leadership</Card.Title>
        <View style={styles.separator} />
        {LEADERS.map((item) => {
          const key = item.id ? item.id.toString() : item.name;
          return (
            <View key={key}>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 8 }}>
                <Avatar
                  source={require('./images/alberto.png')}
                  rounded
                  size="small"
                  containerStyle={{ backgroundColor: '#7cc', marginRight: 10 }}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
          );
        })}
      </Card>
    );
  }
}

const About = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
      <History />
      <Leadership />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    padding: 12,
    borderRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  avatarContainer: {
    marginRight: 10,
  },
});

export default About;