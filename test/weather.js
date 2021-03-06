// test use cases - weather.js APIs
var chai = require('chai');
var expect = require('chai').expect;
var weather = require('../index.js');

describe('OpenWeatherMap ', function(){
	describe('Connection :', function(){
		it('Should connect with the OpenWeatherMap APIs Services ', function(done){
			weather.getResponseCode(function(err, status){
			  chai.assert.equal(status, 200);
			  done();
			});
		});
	});

	describe('Settings :', function(){
		it('Should set the language to Italia (it) ', function(){
			weather.setLang('it');
			chai.assert.equal('it', weather.getLang().toLowerCase());
		});

		it('Should set the units to metric  ', function(){
			weather.setUnits('metric');
			chai.assert.equal('metric', weather.getUnits().toLowerCase());
		});

		it('Should set the City to Fairplay ', function(){
			weather.setCity('Fairplay');
			chai.assert.equal('fairplay', weather.getCity().toLowerCase());
		});

		it('Should set the coordinate to 50.0467656, 20.0048731', function(){
			weather.setCoordinate(50.0467656, 20.0048731);
			var coordinates = weather.getCoordinate();
			expect(coordinates).be.not.empty;
			expect(coordinates.latitude).be.equal(50.0467656);
			expect(coordinates.longitude).be.equal(20.0048731);
		});

		it('Should set the APPID ', function(){
			weather.setAPPID('XNDON1111111111');
			chai.assert.equal('XNDON1111111111', weather.getAPPID());
		});
	});

	describe('Retrive data : ', function(){
		it('Should retrive temperature data ', function(done){
			weather.getTemperature(function(err, temp){

				chai.assert.typeOf(temp , 'number');
				done();
			});
		});
		it('Should retrive pressure data ', function(done){
			weather.getPressure(function(err, pres){
				chai.assert.typeOf(pres , 'number');
				done();
			});
		});
		it('Should retrive humidity data ', function(done){
			weather.getHumidity(function(err, hum){
				chai.assert.typeOf(hum , 'number');
				done();
			});
		});
		it('Should retrive brief description of the weather ', function(done){
			weather.getDescription(function(err, desc){
				chai.assert.typeOf(desc  , 'string');
				done();
			});
		});

		it('Should present all the JSON Weather response data ', function(done){
			weather.getAllWeather(function(err, jsonObj){
				chai.assert.property(jsonObj , 'weather');
				done();
			});
		});
		it('Should present 3 day weather forecast', function(done){
			weather.getWeatherForecastForDays(3, function(err, obj){
				expect(obj).not.empty;
				expect(obj.cnt).is.equal(3);
				expect(obj.list).is.not.empty;
				expect(obj.list.length).is.equal(3);
				done();
			});
		});
		it('Should return a smart JSON weather object ', function(done){
			weather.getSmartJSON(function(err, smart){
				chai.assert.property(smart, 'temp');
				chai.assert.property(smart, 'humidity');
				chai.assert.property(smart, 'pressure');
				chai.assert.property(smart, 'description');
				done();
			});
		});
	});

	describe('Error managment section', function(){
		it('Should show a HTTP error in the request ',function(){
				weather.getError(function(err, data){
						chai.assert.typeOf(err, 'error');
				});
		});
	});

});
