// Define variables to use withins test
var homepage = 'https://github.com/',
	credentials = {
		userName: 'yourUsername',
		password: 'yourPassword'
	},
	search = {
		searchTerm: 'Micromata',
		companyName: 'Micromata GmbH'
	};

module.exports = {
	'Log in and check search results': function (test) {
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

			.type('.js-site-search-form input[type="text"]', 'user:' + search.searchTerm)
			.submit('.js-site-search-form')
			.waitForElement('body')
			.assert.exists('body', 'Suche ausgeführt')
			.assert.exists('.main-content .sort-bar', 'Repositories von `' + search.searchTerm + '` gefunden')

			.click('.search-menu-container .menu li:last-child a')
			.waitForElement('#user_search_results')
			.assert.exists('#user_search_results .user-list-item', 'User `' + search.searchTerm + '` gefunden')

			.click('#user_search_results .user-list-item:first-child > a')
			.waitForElement('body')
			.assert.url('https://github.com/' + search.searchTerm.toLowerCase(), 'URL wie erwartet')
			.assert.text('h1.org-name span', search.companyName, 'Firmenname ist korrekt')

			.done();
	}
};
