module.exports = {
	'Check Login status': function (test) {
		test
			.open('https://github.com/')
			.waitForElement('.header')
			.assert.exists('.header-logged-out', 'User ist ausgeloggt')
			.done();
	}
};
