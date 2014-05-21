var should = require('should');
var request = require('supertest');
var app = require('app');

var data = require('../mocks/data-test.json');
var jade = require('jade');

describe('Ручка /:id', function() {
	it('правильный HTML в ответ на обычный запрос', function(done) {
		var testId = 1;

		request(app)
			.get('/' + testId)
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				jade.renderFile(
					'templates/index.jade', 
					{
						urls: {
							prev: null,
							next: '/2'
						},
						title: 'Я благодарю',
						item: data[testId - 1]
					}, 
					function(err, html) {
						if (err) throw err;
						res.text.should.equal(html);	
						done();
					}
				);
			});
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
				res.body.should.have.properties('status', 'item');
				res.body.item.should.have.properties('id', 'from', 'to', 'reason');
				
				res.body.item.id.should
					.be.a.Number
					.and.be.above(0);

				res.body.item.reason.should
					.be.a.String
					.and.be.not.empty;

				res.body.item.from.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');
				res.body.item.to.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');

				var users = ['from', 'to'];
				for (var i = 0, max = users.length; i < max; i++) {
					with (res.body.item[users[i]]) {
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
			.get('/99999999999')
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