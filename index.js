var mysql = require('mysql');
var express = require('express');
var app = express();

var connection = mysql.createConnection({
	host     : 'sql10.freemysqlhosting.net',
    user     : 'sql10182149',
    password : 'GqXyLl89gK',
    database : 'sql10182149',
    port     : '3306'
});

connection.connect();

/* Requisição para os marcadores no mapa*/
app.get('/api/location', function(req, res){
	connection.query('SELECT * FROM geometria', function(err, results){
		if(err){
			console.log('Error ', err);
		} else {
			res.send(results);
		}
	});
});
/* final da requisição para os marcadores no mapa */

/* Resquisição para o grafico */
app.get('/api/statistic', function(req, res){
	connection.query("SELECT (SELECT COUNT('roubo') FROM geometria WHERE ocorrencia = 'roubo') AS roubo, (SELECT COUNT('acidente') FROM geometria WHERE ocorrencia = 'acidente') AS acidente, (SELECT COUNT('furto') FROM geometria WHERE ocorrencia = 'furto') AS furto, (SELECT COUNT('abuso') FROM geometria WHERE ocorrencia = 'abuso') AS abuso", function(err, results){
		if(err){
			console.log('Error: ', err);
		}else{
			res.send(results && results.length > 0 ? results[0] : { roubo: 0, acidente: 0, furto: 0, abuso: 0});
		}
	});
});
/* final da requisição para o grafico */

app.post('/api/save/location', function(req, res){
	var data = {
		lat: req.query.lat,
		lon: req.query.lon
	};
	
	connection.query("INSERT INTO geometria SET ?", data, function(err, results){
		if(err){
			console.log('Error: ', err);
		}else{
			console.log('Success ', results);
		}
	});
});

app.post('/api/update/location', function(req, res){
		
	ocorrencia = req.query.ocorrencia;
		
	connection.query("UPDATE geometria SET ocorrencia = ? WHERE ocorrencia IS NULL", ocorrencia, function(err, results){
		if(err){
			console.log('Error: ', err);
		}else{
			console.log('Success ', results);
		}
	});
});


app.listen(function(){
    console.log('funcionando');
})


