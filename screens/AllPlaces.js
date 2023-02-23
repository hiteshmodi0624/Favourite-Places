import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import PlacesList from "../components/Places/PlacesList"
import { fetchPlaces } from "../util/database"

const AllPlaces=()=>{
    const [loadedPlaces,setLoadedPlace]=useState([])
    const isFocused=useIsFocused()
    useEffect(()=>{
        if(isFocused){
            async function getPlaces(){
                const fetchedPlaces=await fetchPlaces();
                setLoadedPlace(fetchedPlaces)
              }
              getPlaces()
        }
    },[isFocused,setLoadedPlace])
    return(
        <PlacesList places={loadedPlaces}/>
    )
}
export default AllPlaces