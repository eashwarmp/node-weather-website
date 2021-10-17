let request = require('request')

let forecast = (latitude, longitude, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=c9a4b9a7121f0ffd6d56594010d2510a&query=' + latitude +','+ longitude + '&units=f'
    request( {url , json: true}, (error, { body } = {} ) => {
        if(error) {
          callback('Unable to connect to weather service!' , undefined)
        } else if(body.error) {
          callback('Unable to find the specified Location!' , undefined)
        } else {
          callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
  }
  module.exports = forecast