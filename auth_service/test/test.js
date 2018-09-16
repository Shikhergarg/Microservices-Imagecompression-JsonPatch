'use strict';

const chai = require('chai');
let should = chai.should();
chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

describe('API endpoint /login', function () {
	this.timeout(15000); // How long to wait for a response (ms)

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
	it('wrong email login', (done) => {
		var user = {
			email: "shhhhh",
			password:"12333"
		}
		chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(404);
				done();
			});
	});
	it('wrong password login', (done) => {
		var user = {
			email: "shikher",
			password: "12333"
		}
		chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
	it('password and email are right login', (done) => {
		var user = {
			email: "shikher",
			password: "12345"
		}
		chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('token');
				done();
			});
	});
	it('api test', (done) => {
		chai.request(app)
			.get('/api')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});

	describe('API endpoint /logout', function () {
		this.timeout(15000); // How long to wait for a response (ms)

		before((done) => { //Before each test we empty the database
			done();
		}
		);
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
		it('Checking logout', (done) => {
			chai.request(app)
				.get('/api/auth/logout')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('token').eql(null);
					done();
				});
		});
		

	});
	describe('API endpoint /register', function () {
		this.timeout(15000); // How long to wait for a response (ms)

		before((done) => { //Before each test we empty the database
			done();
		}
		);
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
		it('Register a user', (done) => {
			var user = {
				name: "Shikher123",
				email: "shikher.garg@gmail.com",
				password: "12345"
			}
			chai.request(app)
				.post('/api/auth/register')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('token');
					done();
				});
		});
		it('Register a user without body', (done) => {
			var user = {
				name: "Shikher123",
				email: "shikher.garg@gmail.com",
				password: "12345"
			}
			chai.request(app)
				.post('/api/auth/register')
				.end((err, res) => {
					res.should.have.status(500);
					done();
				});
		});


});
describe('API endpoint /me', function () {
	this.timeout(15000); // How long to wait for a response (ms)

	before((done) => { //Before each test we empty the database
		done();
	}
	);
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
	it('Checking identity without token', (done) => {
		
		chai.request(app)
			.get('/api/auth/me')
			.end((err, res) => {
				res.should.have.status(403);
				done();
			});
	});
	it('First login and then cheking identity', (done) => {
		var user = {
			email: "shikher",
			password: "12345"
		}
		chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.end((error, response) => {
				response.body.should.have.property('token');
				should.not.exist(error);
				chai.request(app)
					.get('/api/auth/me')
					.set('x-access-token', response.body.token)
					.end((err, res) => {
						should.not.exist(err);
						res.status.should.eql(200);
						done();
					});
			});
	})
	it('First login and then cheking without token', (done) => {
		var user = {
			email: "shikher",
			password: "12345"
		}
		chai.request(app)
			.post('/api/auth/login')
			.send(user)
			.end((error, response) => {
				response.body.should.have.property('token');
				should.not.exist(error);
				chai.request(app)
					.get('/api/auth/me')
					.end((err, res) => {
						should.not.exist(err);
						res.status.should.eql(403);
						done();
					});
			});
	});


});


