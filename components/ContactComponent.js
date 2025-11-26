import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const Contact = () => {
  return (
    <ScrollView style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card containerStyle={styles.card}>
          <Text style={styles.headerText}>Contact Information</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>121, Clear Water Bay Road</Text>
          <Text style={styles.text}>Clear Water Bay, Kowloon</Text>
          <Text style={styles.text}>HONG KONG</Text>
          <Text style={styles.text}>Tel: +852 1234 5678</Text>
          <Text style={styles.text}>Fax: +852 8765 4321</Text>
          <Text style={styles.text}>Email: confusion@food.net</Text>
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
  },
  headerText: {
    color: 'Black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: '#f3f3f3',
    margin: 16,
    padding: 16,
    borderRadius: 3,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
    color: '#333',
  },
});

export default Contact;