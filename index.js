const express = require('express');
const BomWeatherAdapter = require('./BomWeatherAdaptor');
const app = express();

const BOM_API = "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json"

app.get('/', async (req, res) => {
  try {
    const bomWeatherApdator = new BomWeatherAdapter()
    
    const data = await bomWeatherApdator.request(BOM_API)
    res.status(200).json(data);
  } catch (e) {
    console.error(e)
    res.status(503).json({ error: 'error' });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`app listening on port http://localhost:${process.env.PORT || 8080}`)
});