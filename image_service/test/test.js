'use strict';

const chai = require('chai');
let should = chai.should();
chai.use(require('chai-http'));

const app = require('../index.js');
// Our app

describe('API endpoint /api/imagecompressor', function () {
	this.timeout(5000); // How long to wait for a response (ms)

	before(done => {
		app.on("app_started", function () {
			done();
		});
	});
	beforeEach((done) => { 
		done();
	});
	after(function () {

	});
	it('should return Not Found', (done) => {
		chai.request(app)
			.get('/Notfound')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});
	it('should return Not Found', (done) => {
		chai.request(app)
			.get('/Notfound')
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});
	it('API Test', (done) => {
		chai.request(app)
			.get('/api')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	
	it('post image test with token', (done) => {
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTExZTk0ZDA4NjQ1NGU1Y2Q1OWJjMCIsImlhdCI6MTUzNzI4NjU5NiwiZXhwIjoxNTM3MzcyOTk2fQ.fFhPXEUuF8CJ4hilJCqMG49KW-vTh0K9usdxwz-WiKQ";
		chai.request(app)
			.post('/api/imagecompressor')
			.set('x-access-token', token)
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				url: "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg"
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.header('content-type','image/jpg')
				done();
			});
	});
	it('post image compressor without token', (done) => {
		
		chai.request(app)
			.post('/api/imagecompressor')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				url: "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg"
			})
			.end((err, res) => {
				res.should.have.status(403);
				done();
			});
	});
	


});