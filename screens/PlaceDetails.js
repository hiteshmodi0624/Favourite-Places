import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/Ui/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({route,navigation}) {
    const [placeData,setPlaceData]=useState({});
  const showOnMapHandler = () => {
    navigation.navigate("Map",{
        lat:placeData.location.lat,
        long:placeData.location.long
    })
  };
  const selectedId=route.params.placeId;
  useEffect(()=>{
    async function loadPlaceData(){
        const data=await fetchPlaceDetails(selectedId);
        setPlaceData(data);
        navigation.setOptions({
            title:data.title
        })
    }
    loadPlaceData()
  },[selectedId,setPlaceData])
  if(!placeData){
    return <View style={styles.fallback}>
        <Text style={styles.address}>Loading place data...</Text>
    </View>
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri:placeData.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeData.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}
export default PlaceDetails;
const styles=StyleSheet.create({
    fallback:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
        height:'35%',
        minHeight:300,
        width:"100%"
    },
    locationContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    addressContainer:{
        padding:20
    },
    address:{
        color:Colors.primary500,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16
    }
})