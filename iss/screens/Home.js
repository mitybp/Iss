import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Estação Espacial</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>{this.props.navigation.navigate("IssLocation")}}>
          <Text style={styles.btnText}>Localização da EEI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{this.props.navigation.navigate("Meteors")}}>
          <Text style={styles.btnText}>Meteoros</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#2d2942"
  },
  title:{
    flex: 0.10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 22
  },
  titleText:{
    fontSize: 36,
    color: "#f83a26"
  },
  btn:{
    backgroundColor: "#ffc344",
    flex: 0.10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center"
  },
  btnText:{
    fontSize: 20,
    textAlign: "center",
  }
})