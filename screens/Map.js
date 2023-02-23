import React, { useState,useLayoutEffect, useCallback } from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from 'react-native';
import IconButton from '../components/Ui/IconButton';

export default function Map({navigation,route}) {
    const region={
        latitude: route.params?route.params.lat:26,
        longitude: route.params?route.params.long:91,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const [selectedLocation,setSelectedLocation]=useState({
        lat:region.latitude,
        long:region.longitude
    })
    function selectLocationHandler(event){
        const lat=event.latitude;
        const long=event.longitude;
        setSelectedLocation({lat:lat,long:long})
    }
    const savePickedLocationHandler=useCallback(()=>{
        navigation.navigate('AddPlace',{
            lat:selectedLocation.lat,
            long:selectedLocation.long
        })
    },[navigation,selectedLocation])
    useLayoutEffect(()=>{
      if(!route.params)
        navigation.setOptions({
            headerRight:({tintColor})=><IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>
        })
    },[navigation,savePickedLocationHandler,route])
  return (
      <MapView style={styles.map} initialRegion={region} onRegionChange={selectLocationHandler} >
        <Marker coordinate={{latitude:selectedLocation.lat,longitude:selectedLocation.long}}/>
      </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});