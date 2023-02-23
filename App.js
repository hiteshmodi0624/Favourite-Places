import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./components/Ui/IconButton";
import { Colors } from "./constants/colors";
import AddPlace from "./screens/AddPlace";
import AllPlaces from "./screens/AllPlaces";
import Map from "./screens/Map";
import { init } from "./util/database";
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(()=>{
    init().then(async()=>{
      await SplashScreen.hideAsync();
    }).catch((err)=>console.log(err))

  },[])
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700}
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
              title:"Your Favourite Places",
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title:"Add a new Place"
          }}/>
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title:"Loading Place..."
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
