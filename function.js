'use strict';

module.exports = {
	getId
};

function getId(userContext, events, done) {
	userContext.vars.id = Math.floor(Math.random() * 100000);
	return done()
}