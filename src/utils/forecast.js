const request= require('request')


const forecast=( latitude,longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=e8ddc1090bba4003d879759ae4833b3d&query=' + latitude+','+longitude+''
    request({ url, json:true},(error, {body})=>{
        if(error){
            callback('unable to connect', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)

        }else{
            callback(undefined,{
                temperature:'Temprature: '+ body.current.temperature,
                feelslike:'Feels like: '+ body.current.feelslike
            })
        }
    })
}

module.exports= forecast