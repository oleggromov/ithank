var should = require('should');
var request = require('supertest');
var app = require('app');

describe('Ручка /:id', function() {
	it('возращает JSON, если приняла аякс-запрос', function(done) {
		request(app)
			.get('/1')
			.set('X-Requested-With', 'XMLHttpRequest')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
	});

	it('возращает HTML, если приняла обычный запрос', function(done) {
		request(app)
			.get('/1')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

	it('отдает JSON правильной стуктуры', function(done) {
		request(app)
			.get('/1')
			.set('x-requested-with', 'XMLHttpRequest')
			.expect(200)
			.end(function(err, res) {
				res.body.should.have.properties('id', 'from', 'to', 'reason');
				res.body.from.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');
				res.body.to.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');
				done();
			});
	});
});