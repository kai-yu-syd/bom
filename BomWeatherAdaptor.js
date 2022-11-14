var superagent = require('superagent')

function BomWeather() {
  this.response = null

  this.setData = function (response) {
    this.response = response
  }

  this.getData = function () {
    const { body } = this.response
    let stations = body.observations.data.map((data) => ({
      lat: data.lat,
      long: data.lon,
      apparent_t: data.apparent_t,
      name: data.name
    }))
    stations = stations.filter((station) => station.apparent_t > 20)
    stations.sort((a, b) => a.apparent_t - b.apparent_t)
    return {
      responseKey: body.observations.header[0].main_ID,
      stations: stations
    }
  }

  this.fetchData = async function (apiUrl) {
    try {
      const response = await superagent.get(apiUrl)
      return response
    } catch (error) {
      throw {
        error: "Error Connecting to BOM."
      }
    }
  }
}

function BomWeatherAdapter() {
  const weather = new BomWeather()

  return {
    request: async function (apiUrl) {
      const response = await weather.fetchData(apiUrl)
      weather.setData(response)
      return weather.getData()
    }
  }
}

module.exports = BomWeatherAdapter