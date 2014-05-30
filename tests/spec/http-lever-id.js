var should = require('should');
var request = require('supertest');
var server = require('../../server/app.js')('test', 3000);

var data = require('../mocks/data-test.json');
var jade = require('jade');

describe('Ручка /:id', function() {

	describe('в зависимости от заголовка X-Requested-With', function() {
		it('отдает HTML', function(done) {
			request(server)
				.get('/1')
				.expect(200)
				.end(function(err, res) {
					res.should.be.html;
					done();
				});
		});
		it('отдает JSON', function(done) {
			request(server)
				.get('/1')
				.set('X-Requested-With', 'XMLHttpRequest')
				.end(function(err, res) {
					res.should.be.json;
					done();
				});
		});
	});

	describe('если попросили данные о существующей благодарности', function(done) {
		it('вернет определенную разметку страницы благодарности', function(done) {
			request(server)
				.get('/1')
				.end(function(err, res) {
					if (err) throw err;

					jade.renderFile(
						'templates/index.jade',
						{
							urlEarlier: null,
							urlLater: '/2',
							title: 'Я благодарю',
							item: data[0]
						},
						function(err, html) {
							if (err) throw err;
							res.text.should.equal(html);
							done();
						}
					);
				});
		});
		it('вернет JSON определенной структуры, если это ajax-запрос', function(done) {
			request(server)
				.get('/1')
				.set('X-Requested-With', 'XMLHttpRequest')
				.end(function(err, res) {
					res.body.should.have.properties('success', 'code', 'data');
					res.body.data.item.should.have.properties('id', 'from', 'to', 'reason');

					res.body.code.should.equal(200);
					res.body.success.should.be.ok;

					res.body.data.item.id.should
						.be.a.Number
						.and.be.above(0);

					res.body.data.item.reason.should
						.be.a.String
						.and.be.not.empty;

					res.body.data.item.from.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');
					res.body.data.item.to.should.have.properties('sex', 'name', 'nameGenetive', 'idVk');

					var users = ['from', 'to'];
					for (var i = 0, max = users.length; i < max; i++) {
						with (res.body.data.item[users[i]]) {
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
	});

	describe('если попросили несуществующую благодарность', function() {
		it('вернет 404, если это обычный запрос', function(done) {
			request(server)
				.get('/-1')
				.expect(404, done);
		});
		it('вернет JSON определенной структуры, если это ajax-запрос', function(done) {
			request(server)
				.get('/100500')
				.set('X-Requested-With', 'XMLHttpRequest')
				.end(function(err, res) {
					res.body.should.have.properties('code', 'success', 'message');
					res.body.code.should.equal(404);
					res.body.success.should.not.be.ok;
					res.body.message
						.should.be.a.String
						.and.be.not.empty;

					done();
				});
		});
	});
});