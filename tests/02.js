// Define variables to use withins test
var homepage = 'https://github.com/',
	credentials = {
		userName: 'yourUsername',
		password: 'yourPassword'
	};

module.exports = {
	'Check Login status': function (test) {
		test
			.open(homepage)
			.waitForElement('.header')
			.assert.exists('.header-logged-out', 'User ist ausgeloggt')
			.done();
	},
	'Log in': function (test) {
		test
			.open(homepage)
			.waitForElement('a.button.signin')
			.click('a.button.signin')
			.waitForElement('#login_field')
			.waitForElement('#password')
			.type('#login_field', credentials.userName)
			.type('#password', credentials.password)
			.submit('#login form')
			.waitForElement('body')
			.assert.exists('.octicon-sign-out', 'User ist eingeloggt')
			.done();
	},
	'Log out': function (test) {
		test
			.open(homepage)
			.waitForElement('.octicon-sign-out')
			.click('.octicon-sign-out')
			.waitForElement('body')
			.assert.exists('a.button.signin', 'User ist ausgeloggt')
			.done();
	}
};
