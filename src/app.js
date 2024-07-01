const path= require('path')
const express= require('express')
const hbs = require('hbs');
const geocode = require('./utils/goecode');
const forecast = require('./utils/forecast');

const app= express()

//define path for express config
const publicd=path.join(__dirname, '../public')
const viewspath= path.join(__dirname, '../templates/views')
const partialpath= path.join(__dirname, '../templates/partials')

//setup handbars engine 
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

//set up static directory to server
app.use(express.static(publicd))


app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather',
        name:'hamza'
    })
})

app.get('/about',(req, res)=>{
res.render('about',{
    title:'About',
    name: 'hamza'
})
})


app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help',
        name: 'hamza'
    })
})



app.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
    
            res.send({
                forcast: forecastdata,
                location,
                address: req.query.address
                 
             })
    })
       

       })
  
})








app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search value'
        })
    }
   console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:'404',
    name: 'Hamza',
        errorMessage: 'help article not found'
    })
})

app.get('*',(req, res)=>{
res.render('error',{
    title:'404',
    name: 'Hamza',
    errorMessage:'My 404 page'
})
})


app.listen(3000, ()=>{
    console.log('server is up')
})