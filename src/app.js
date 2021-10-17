const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Eashwar MP'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name : 'Eashwar MP'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Need Help?',
        contents: 'Please contact the number ending in 6740 for Customer Care support',
        name : 'Eashwar MP'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error) {
           return res.send({error});
        }
     forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
            return res.send({error})
          }
           res.send({
            forecast : forecastData,
            location: location,
            address: req.query.address
        })
      })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
      return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : {}
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        errorMessage: 'Help Article not found',
        name: 'Eashwar'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'Eashwar'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})