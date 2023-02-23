
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors"
import OutlineButton from "../Ui/OutlineButton"
import {getCurrentPositionAsync,useForegroundPermissions,PermissionStatus} from "expo-location"
import { useEffect, useState } from "react"
import { getAddress, getMapPreview } from "../../util/location";
import { useIsFocused, useNavigation,useRoute } from "@react-navigation/native"
const LocationPicker=({onPickLocation})=>{
    const navigation=useNavigation()
    const route=useRoute()
    const [pickedLocation,setPickedLocation]=useState()
    const [locationPermissionInformation,requestPermission]=useForegroundPermissions();
    const AlertButtonPressHandler=async () => {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
    const isFocused=useIsFocused()
    async function verifyPermissions(){
        if(locationPermissionInformation.status===PermissionStatus.UNDETERMINED){
            const getResponse=await requestPermission();
            return getResponse.granted;
        }
        else if(locationPermissionInformation.granted===PermissionStatus.DENIED){
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant location permission to use this app",
                [
                  {
                  text: "Close",
                    style: "cancel",
                  },
                  {
                    text: "Grant access",
                    onPress: AlertButtonPressHandler,
                  },
                ]
              );
              return false;
        }
        return true;
    }
    useEffect(()=>{
        if(isFocused&&route.params){
            const mapPickedLocation={lat:route.params.lat,long:route.params.long}
            if(mapPickedLocation){
                setPickedLocation(mapPickedLocation)
            }
        }
    },[route,setPickedLocation,isFocused])

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLocation){
                try {
                    const address=await getAddress(pickedLocation.lat,pickedLocation.long)
                    onPickLocation({...pickedLocation,address:address});
                } catch (error) {
                    Alert.alert("There was an error","Could Not fetch Address!")
                }
                
            }
        }
        handleLocation()
    },[pickedLocation,onPickLocation])

    const getLocationHandler=async()=>{
        const hasPermission=await verifyPermissions();
        if(!hasPermission)
            return;
        const location=await getCurrentPositionAsync()
        setPickedLocation({
            lat:location.coords.latitude,
            long:location.coords.longitude
        })
    }
    const pickOnMapHandler=()=>{
        navigation.navigate('Map')
    }
    let locationPreview=<Text>No location picked yet.</Text>
    if(pickedLocation){
        const imageUri=getMapPreview(pickedLocation.lat,pickedLocation.long);
        locationPreview=<Image source={{uri:imageUri}} style={styles.map}/>
    }
    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlineButton onPress={getLocationHandler} icon="location">Locate</OutlineButton>
                <OutlineButton onPress={pickOnMapHandler} icon="map">Pick on Map</OutlineButton>
            </View>
        </View>
    )
}   
export default LocationPicker

const styles=StyleSheet.create({
    mapPreview:{
        width:"100%",
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    map:{
        width:'100%',
        height:'100%'
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-around"
    }
})