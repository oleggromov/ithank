var should = require('should');
var request = require('supertest');
var app = require('app');

describe('Ручка /:id', function() {
	it('HTML в ответ на обычный запрос', function(done) {
		request(app)
			.get('/1')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	});

	it('JSON в ответ на X-Requested-With: XMLHttpRequest', function(done) {
		request(app)
			.get('/1')
			.set('X-Requested-With', 'XMLHttpRequest')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
	});

	it('JSON: правильная структура и типы значений в благодарности', function(done) {
		request(app)
			.get('/1')
			.set('x-requested-with', 'XMLHttpRequest')
			.expect(200)
			.end(function(err, res) {
				res.body.should.have.properties('id', 'from', 'to', 'reason');
				
				res.body.id.should
					.be.a.Number
					.and.be.above(0);

				res.body.reason.should
					.be.a.String
					.and.be.not.empty;

				res.body.from.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');
				res.body.to.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');

				var users = ['from', 'to'];
				for (var i = 0, max = users.length; i < max; i++) {
					with (res.body[users[i]]) {
						sex.should
							.be.a.String
							.and.have.length(1);

						name.should
							.be.a.String
							.and.be.not.empty;

						nameGenetive.should
							.be.a.String
							.and.be.not.empty;

						idVk.should
							.be.a.Number
							.and.be.above(0);
					}
				}

				done();
			});
	});

	it('JSON: ошибка, когда просим несуществуюший ID', function(done) {
		request(app)
			.get('/-1') // такого ID не может быть, само собой
			.set('x-requested-with', 'XMLHttpRequest')
			// нужен ли другой статус-код в случае ошибки? как его будет обрабатывать backbone?
			.expect(200)
			.end(
				isErrorReturned(done)
			);
	});

	it('JSON: ошибка, когда просим слишком большой ID', function(done) {
		request(app)
			.get('/99999999999999999')
			.set('x-requested-with', 'XMLHttpRequest')
			.expect(200)
			.end(
				isErrorReturned(done)
			);
	});

	it('JSON: отдаёт ошибку, когда просим белиберду вместо ID', function(done) {
		request(app)
			// TODO как бы сюда разной белиберды напихать?
			.get('/a_230dhZ":S*@#@K!J#HKJSHADJH)(AS*D')
			.set('x-requested-with', 'XMLHttpRequest')
			.expect(200)
			.end(
				isErrorReturned(done)
			);
	});
});

function isErrorReturned(done) {
	return function(err, res) {
		res.body.should.have.properties('status', 'message');
		res.body.status.should.be.false;
		res.body.message
			.should.be.a.String
			.and.be.not.empty;
		done();
	}
}