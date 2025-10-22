// Unit Tests for sample-app
//
// For testing locally, install MochaJS first:
//		sudo npm install -g mocha
//
// Then run this script via mocha:
//		mocha test.js

const assert = require('assert');
const fs = require('fs');
const api = require('./api');
const ENV = require('/etc/env.json');

describe( "sample-app", function() {
	this.timeout( 30000 );
	
	before( function(done) {
		api.startup( function() {
			done();
		});
	});
	
	describe("API", function() {
		it("responds correctly", function(done) {
			assert.ok( api.handler, "API has no handler method" );
			
			var args = {
				query: { foo: 'bar' },
				params: {
					session: {
						User: {
							FullName: "Fred Smith"
						}
					}
				}
			};
			api.handler( args, function(resp) {
				assert.ok( resp, "No response from API" );
				assert.ok( resp.code === 0, "Unexpected response code: " + resp.code );
				assert.ok( resp.query, "No query echo in response" );
				assert.ok( resp.query.foo === 'bar', "Unexpected query parameter value: " + resp.query.foo );
				assert.ok( resp.description, "No description in response" );
				assert.ok( !!resp.description.match(/Fred\s+Smith/), "Expected string not found in description: " + resp.description );
				assert.ok( !!resp.description.match( ENV.EnvironmentID ), "Expected env ID not found in description: " + resp.description );
				done();
			} );
		});
	});
});
