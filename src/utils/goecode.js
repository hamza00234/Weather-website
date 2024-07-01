const request=require('request')

const geocode= (address, callback)=>{
    const url='https://geocode.maps.co/search?q='+address+'&api_key=6675b8d60dd0f937368619yqsd7237b'
    request({ url , json: true},(error, {body})=>{
       if(error){
           callback('unable to connect', undefined)
       }else if(body.length===0){
           callback('not found', undefined)
       }else{
           callback(undefined, {
               latitude: body[0].lat,
               longitude: body[0].lon,
               location: body[0].display_name
           })
           
       } 
    })
}



module.exports= geocode