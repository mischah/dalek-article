// Define variables to use withins test
var homepage = 'https://github.com/',
	breakpoints = {
		xLarge: 1280,
		large: 1024
	};

module.exports = {
	'Visually check breakpoints': function (test) {
		test
			.open(homepage)
			.waitForElement('body')
			.resize({width: breakpoints.large, height: 1024})
			.screenshot('tests/screenshots/breakpoint-' + breakpoints.large + '-' + new Date().getTime() + '.png')
			.assert.width('body', breakpoints.large, 'Fensterbreite auf ' + breakpoints.large + 'px geändert')
			.resize({width: breakpoints.xLarge, height: 1024})
			.screenshot('tests/screenshots/breakpoint-' + breakpoints.xLarge + '-' + new Date().getTime() + '.png')
			.assert.width('body', breakpoints.xLarge, 'Fensterbreite auf ' + breakpoints.xLarge + 'px geändert')

			.done();
	},
};
