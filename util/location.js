 import {GOOGLE_API_KEY} from '@env'

export function getMapPreview(lat,long){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7C${lat},${long}
    &key=${GOOGLE_API_KEY}`
    
}
export async function getAddress(lat,long){
    const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`;
    const response =await fetch(url);
    if(!response.ok){
        throw new Error('Failed to Fetch Address!')
    }
    const data=await response.json();
    const address=data.results[0].formatted_address;
    return address;
}