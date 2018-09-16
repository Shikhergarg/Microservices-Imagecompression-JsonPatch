'use strict';

const chai = require('chai');
let should = chai.should();
chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

describe('API endpoint /api/jsonpatch', function () {
	this.timeout(5000); // How long to wait for a response (ms)

	before(done => {
		app.on("app_started", function () {
			done();
		});
	});
	beforeEach((done) => { //Before each test we empty the database
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
	it('post json patch without token', (done) => {
		
		var patch = {jsonobj: '',jsonpatch: ''};
			chai.request(app)
				.post('/api/jsonpatch')
				.send(patch)
				.set('content-type', 'application/x-www-form-urlencoded')
				.end((err, res) => {
					res.should.have.status(403);
					done();
				});
	});
	it('post json patch with token', (done) => {
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWRlYTBmOTg5MGY0NTMyODJkNWU3OCIsImlhdCI6MTUzNzA3NTcyOCwiZXhwIjoxNTM3MTYyMTI4fQ.Lqk_ybplYfosz7G64MzH91ZMa54883TTmIwmikW1Cac";
		
		
		var patch = { jsonobj: '{"baz": "qux","foo": "bar"}', jsonpatch: '[{ "op": "replace", "path": "/baz", "value": "boo" }]' };
		chai.request(app)
			.post('/api/jsonpatch')
			.send(patch)
			.set('x-access-token', token)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('JSON Format is incorrect', (done) => {
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOWRlYTBmOTg5MGY0NTMyODJkNWU3OCIsImlhdCI6MTUzNzA3NTcyOCwiZXhwIjoxNTM3MTYyMTI4fQ.Lqk_ybplYfosz7G64MzH91ZMa54883TTmIwmikW1Cac";


		var patch = { jsonobj: '{324143}', jsonpatch: '[{ "op": "replace", "path": "/baz", "value": "boo" }]' };
		chai.request(app)
			.post('/api/jsonpatch')
			.send(patch)
			.set('x-access-token', token)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				res.should.have.status(403);
				done();
			});
	});

	
	
});