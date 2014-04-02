/**
 * Created by isuarez on 3/31/14.
 */

var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');
var config = require('../../server/config/config.js');


describe('Config Module', function () {

        describe('config', function() {

           it('should have property development.', function () {
              expect(config).to.have.property('development');
           });

           it('should have the property production', function () {
               expect(config).to.have.property('production')
           });

        });

        describe('config.development', function() {

            it('should have properties.', function () {
                expect(config.development).to.have.property('db');
                expect(config.development).to.have.property('rootPath');
                expect(config.development).to.have.property('port');


            });

            it('should properties has values.', function () {
                expect(config.development.db).to.contain('mongodb');
                expect(config.development.rootPath).not.to.be.empty;
                expect(config.development.port).not.to.be.empty;


            });

            it('should be running in development port', function() {

                expect(config.development.port).to.be.equal(process.env.PORT || 3000);

            });



        });


        describe('config.production', function() {

            it('should have properties.', function () {
                expect(config.production).to.have.property('db');
                expect(config.production).to.have.property('rootPath');
                expect(config.production).to.have.property('port');


            });

            it('should properties has values.', function () {
                expect(config.production.db).to.contain('mongodb');
                expect(config.production.rootPath).not.to.be.empty;
                expect(config.production.port).not.to.be.empty;


            });



        });

    }

)