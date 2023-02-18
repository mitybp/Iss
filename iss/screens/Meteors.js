import React, { Component } from 'react';
import { Text, View, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      meteors:{}
    }
  }

  componentDidMount(){
    this.getMeteors();
  }

  getMeteors = () => {
    axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=joKX1G4hbOFHEe2EvDtZZVipEm1yHmTytYzDqj29').then((response) => {
      this.setState({
        meteors: response.data.near_earth_objects
      });
    }).catch((error) => {
        alert(error.message);
      });
  };

  keyExtractor=(item,index)=>{
    index.toString();
  }

  renderItem=({item})=>{
    return(
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardInfo}>Mais próximo da Terra: {<Text style={styles.cardValue}>{item.close_approach_data[0].close_approach_date_full}</Text>}</Text>
        <Text style={styles.cardInfo}>Diâmetro mínimo (Km): {<Text style={styles.cardValue}>{item.estimated_diameter.kilometers.estimated_diameter_min}</Text>}</Text>
        <Text style={styles.cardInfo}>Diâmetro máximo (Km): {<Text style={styles.cardValue}>{item.estimated_diameter.kilometers.estimated_diameter_max}</Text>}</Text>
        <Text style={styles.cardInfo}>Velocidade (Km/h): {<Text style={styles.cardValue}>{item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>}</Text>
        <Text style={styles.cardInfo}>Distância da Terra (Km): {<Text style={styles.cardValue}>{item.close_approach_data[0].miss_distance.kilometers}</Text>}</Text>
      </View>
    )
  }

  render() {
    if(Object.keys(this.state.meteors).length===0){
      return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontSize: 22, textAlign: "center"}}>Loading...</Text>
        </View>
      );
    }else{
      let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
        return this.state.meteors[meteor_date]
      })

      let meteors=[].concat.apply([], meteor_arr);

      meteors.forEach(element=>{
        let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2;

        let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000;

        threatScore = element.threat_score;
      });
      meteors.sort((a,b)=>{
        return b.threatScore - a.threatScore
      });
      meteors=meteors.slice(0,5);
      console.log(meteors);
      return(
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Meteoros</Text>
          </View>
          <FlatList
            keyExtractor={(item,index)=>{
              index.toString();
            }}
            data={meteors}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#2d2942"
  },
  title:{
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 22
  },
  titleText:{
    fontSize: 36,
    color: "#f83a26"
  },
  card:{
    backgroundColor: "#ffc344",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardTitle:{
    fontSize: 22,
    textAlign: "center",
    marginBottom: 4
  },
  cardInfo:{
    padding: 4,
    fontSize: 18
  },
  cardValue:{
    color: "#f83a26"
  }
});