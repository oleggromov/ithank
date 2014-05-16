var should = require('should');
var request = require('supertest');

// создаем новый инстант приложения:
// подняли веб-сервер в тестовом окружении
var app = require('app');

describe('/:id', function() {
	it('должен отдавать JSON, если принял аякс-запрос', function(done) {
		request(app)
			.get('/1')
			.set('X-Requested-With', 'XMLHttpRequest')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('должен отдавать HTML, если принял обычный запрос', function(done) {
		request(app)
			.get('/2')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

	it('должен отдавать данные о благодарности Карпыча Громычу', function(done) {
		request(app)
			.get('/1')
			.set('x-requested-with', 'XMLHttpRequest')
			.expect(200)
			.end(function(err, res) {
				res.body.should.eql({ from: 'Карпыч', to: 'Громыч', reason: 'всё на свете' });
				done();
			});
	});
});