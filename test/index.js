var expect = require('chai').expect;
var request = require('superagent');
const BomWeatherAdapter = require('../BomWeatherAdaptor');

const baseUrl = 'http://localhost:8080/'

describe('bom api status and body', () => {
  it('status', function (done) {
    request(baseUrl, function (error, response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('body', function (done) {
    request(baseUrl, function (error, response) {
      const { body } = response

      expect(body).have.keys(['responseKey', 'stations'])

      expect(body.responseKey).to.be.a('string')
      expect(body.stations).to.be.an('array')

      expect(body.responseKey.length).to.be.greaterThan(0, 'responseKey should have length that greater 0')
      expect(body.stations.length).to.be.greaterThan(0, 'stations should have length that greater 0')

      for (let station of body.stations) {
        expect(station).have.keys(['name', 'apparent_t', 'lat', 'long'])
        expect(station.apparent_t).is.greaterThan(20)
      }

      const sorted = body.stations.sort((a, b) => a.apparent_t - b.apparent_t)
      expect(body.stations).to.have.ordered.members(sorted)
      done();
    });
  });

  it('body should return an error message', async () => {
    const invalidUrl = 'INVALID_URL'
    const bomWeatherAdapter = new BomWeatherAdapter()

    try {
      await bomWeatherAdapter.request(invalidUrl)
    } catch (error) {
      expect(error).to.deep.equal({
        error: "Error Connecting to BOM."
      })
    }
  })
});
