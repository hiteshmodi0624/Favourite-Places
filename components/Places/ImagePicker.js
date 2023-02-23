import { launchCameraAsync,useCameraPermissions,PermissionStatus } from "expo-image-picker"
import { useState } from "react"
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors"
import OutlineButton from "../Ui/OutlineButton"

const ImagePicker=({onTakeImage})=>{
    const [pickedImage,setPickedImage]=useState('')
    const [cameraPermissonInformation,requestPermission]=useCameraPermissions()
    const AlertButtonPressHandler=async () => {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    async function verifyPermissions(){
        if(cameraPermissonInformation.status===PermissionStatus.UNDETERMINED){
            const permissionResponse=await requestPermission();
            return permissionResponse.granted;
        }
        else if(cameraPermissonInformation.status===PermissionStatus.DENIED){
            Alert.alert(
              "Insufficient Permissions",
              "You need to grant camera permission to use this app",
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
    async function takeImageHandler(){
        const hasPermission=await verifyPermissions();
        if(!hasPermission)
            return
        const image=await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.assets[0].uri)
        onTakeImage(image.assets[0].uri)
    }
    let imagePreview=<Text>No image taken yet.</Text>
    if(pickedImage){
        imagePreview=<Image style={styles.image} source={{uri:pickedImage }} />
    }
    return(
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton onPress={takeImageHandler} icon="camera">Take Image</OutlineButton>
        </View>
    )
}   
export default ImagePicker

const styles=StyleSheet.create({
    imagePreview:{
        width:"100%",
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    image:{
        width:'100%',
        height:'100%'
    }
})