#DalekJS Hackathon

##Was ist DalekJS
DalekJ ist im Prinzip eine Art »Fernsteuerung« für einen Browser mit der man

* in einem einem Browser Aktionen ausführen kann (URLs aufrufen, Elemente anklicken, Formularfelder füllen, Screenshots erstellen usw.)
* überprüfen kann, ob das Resultat solcher Aktionen den Erwartungen entspricht.

Per Default wird als Browser PhantomJS verwendet. Dabei handelt es sich um einen »headless« Webkit Browser (läuft fensterlos im Terminal).

Man kann DalekJS also dafür nutzen Oberflächen-Tests (UI Tests) von Webseiten oder Webapplikationen zu automatisieren. Das macht vor allem  bei sich wiederholenden Tests nach festen Testplänen Sinn. Z.b. bei [Regressionstests](http://de.wikipedia.org/wiki/Regressionstest) vor jedem Release.

Die Tests werden mit Hilfe der DalekJS API in JavaScript geschrieben.

Bei DalekJS handelt es sich um Open Source Software die von [Sebastian Golasch](https://github.com/asciidisco) komplett auf [Github](https://github.com/dalekjs) veröffentlicht wurde.

## Installation
Zum jetzigen Zeitpunkt ist DalekJS nur über die Kommandozeile zu verwenden.
Es läuft unter Windows, Linux & Mac. Die einzige Voraussetzung ist [Node.js][node]

Bei der Installation unterscheiden wir zwischen der einmaligen globalen Installation der DalekJS Command line Tools und der lokalen Installation in eurem zu testenden Projekt.

Mit Node.js wir ein Paket Manager Namens `npm` installiert.
Ob dieser vorhanden ist kann mit folgender Eingabe überprüft werden:

	npm --version

Dann sollte die Versionsnummer von npm im Terminal ausgegeben werden. Also so etwas wie:

	1.4.10

Wenn das der Fall ist kann mit der Installation von DalekJS begonnen werden.

Falls nicht muss zunächst [Node.js][node] installiert werden. Am Mac empfehle ich die Installation via [Homebrew](http://brew.sh). Nicht nur aus dem Grund einfacher die Version switchen zu können, sonder vor allem, weil es am Mac potentiell Berechtigungsprobleme bei der Ausführung von `npm` gibt.

[node]: http://nodejs.org/

### Globale Installation der Command Line Tools

Zunächst muss DalekJS Command Line Tools global installiert werden. Das dient dazu das der `dalek` Befehl im Terminal genutzt werden kann. Dazu einfach folgendes ins Terminal eingegeben:

	npm install dalek-cli -g

Ob die Command Line Tools hiermit erfolgreich installiert wurden lässt sich über die folgende Eingabe überprüfen:

	 dalek -v

Der Befehl sollte dafür sorgen, dass so etwas wie das folgende ausgegeben wird:

	DalekJS CLI Tools Version: 0.0.4
	Brought to you with love by: Sebastian Golasch (@asciidisco) 2013

Wenn das geklappt hat muss jetzt nur noch das zu testende Projekt um eine lokale DalekJS Installation erweitert werden.


### Lokale Installation in eurem Projekt

Auch das ist in wenigen Zeilen erledigt.

Das Projekt benötigt eine Datei Namens `package.json` in seinem Root-Verzeichnis. Falls diese noch nicht vorhanden ist reicht es eine Datei mit den folgenden Inhalt anzulegen:

	{
	  "name": "meinProjekt",
	  "description": "Kurzbeschreibung des Projektes",
	  "version": "0.0.1"
	}

Das ist die Config-Datei für npm. Wenn das Projekt nicht über die npm-Registry veröffentlich werden soll, ist es wenig relevant wie genau die Informationen sind.

Mit Vorhandensein der `package.json` können wir nun DalekJS und lokal, d.h. für dieses Projekt in einem Unterverzeichnis installieren. Dazu einfach im Root-Verzeichnis des Projektes folgendes ins Terminal eingeben:

	npm install dalekjs --save-dev

Um zu überprüfen ob die lokale Installation korrekt vorgenommen wurde kann  im Anschluss an die Installation erneut:

	 dalek -v

eingegeben werden. Nun sollte zusätzlich die Versionsnummer der lokalen Installation im Terminal ausgegeben werden. In etwa so:

	DalekJS CLI Tools Version: 0.0.4
	DalekJS  local install: 0.0.8
	Brought to you with love by: Sebastian Golasch (@asciidisco) 2013

Herzlichen Glückwunsch. Nun kann es richtig los gehen.

### Alternative zur lokale Installation in eurem Projekt

Anstatt der lokalen Installation im Root eurer Applikation könnt ihr auch dieses Repository an einen beliebigen Ort clonen und einmal den folgenden Befehl ausführen um die in der `package.json` definierten Dependencies zu installieren:

	npm install

Das installiert neben dalek auch die folgenden beiden Plugins:

* [dalek-browser-chrome](https://github.com/dalekjs/dalek-browser-chrome) (Chrome Browser bindings for DalekJS)
* [dalek-reporter-html](https://github.com/dalekjs/dalek-reporter-html) (Static HTML reporter for the Dalekjs testing framework)

Zu diesen beiden Plugins weiter unten mehr ([Browser Plugins](#einsatz-mit-verschieden-Browsern), [Reporter-Plugins](#alternative-reports)).

##Die API, oder »so schreibe ich meine Tests«

Das Handwerkszeug zum schreiben der Tests ist die API von DalekJS. Mit Hilfe einer überschaubaren Anzahl von Befehlen (API Methoden) könnt ihr in JavaScript eure Tests schreiben.

Bei diesen Methoden unterscheiden wir zwischen

1. **Actions:**
   Legen fest, welche Aktion im Browser ausgeführt werden soll (URL aufrufen,
   Element anklicken, Formularfeld füllen, Screenshot erstellen usw.).
2. **Assertions:**
   Überprüfen ob das Resultat einer solchen Aktionen den den Erwartungen
   entspricht (aktuelle URL, Text innerhalb eines bestimmten Elementes,
   Seitentitel usw.).

Bei der API handelt es sich um eine sogenannte »Fluid API«. Das bedeutet, dass wir Methoden durch sogenanntes »Method chaining« einfach hintereinander wegschreiben können. Wir können unsere Tests also im Prinzip in jQuery Manier in folgender Syntax schreiben:

	test.open('foo')
		.click('.bar')
		.waitForElement('#baz')
		.assert.title().is('fooBar', 'Yeah')
		.done();

Was diese Befehle bedeuten wird direkt im Anschluss geklärt.

###»Actions« – Die Steuerung des Browsers

Eine komplette Auflistung aller zu verwendenden Action-Methoden findet ihr in der [DalekJS Dokumentation](http://dalekjs.com/docs/actions.html).

Die Auswahl des von einer Action betroffenen Elementes findet mit Hilfe von CSS Selektoren statt. Das heißt man kann z.B. auch Attribut-Selektoren verwenden. Mit einer kleinen [Einschränkung](#selector-engine).

Nachfolgend ein kleiner Auszug der subjektiv wichtigsten Methoden:

*	[.open()](http://dalekjs.com/docs/actions.html#meth-open)
	Öffnet eine URL. Prinzipiell das gleiche wie eine eine Adresse in den 	Browser einzugeben und Return zu drücken.

		.open('http://dalekjs.com')

*	[.click()](http://dalekjs.com/docs/actions.html#meth-click)
	Führt einen Klick auf das selektierte Element aus.

		.click('#logout')

* 	[.type()](http://dalekjs.com/docs/actions.html#meth-type)
	Tippt Text in Input-Felder oder Textareas. Diese Methode unterscheidet 	sich 	von `.setValue()`, da der Text hier wirklich Buchstabe für 	Buchstabe getippt wird. Damit lässt sich z.B. auch ein Autocomplete 	Widget testen.

		.type('#MyElement', 'Mein Text')

* 	[.waitForElement()](http://dalekjs.com/docs/actions.html#meth-waitForElement)
	Wartet mit dem Beginn der nächsten Aktion, bis das selektierte Element im DOM existiert.
	Nützlich für das testen von Ajax Funktionalitäten.

		.waitForElement('#result')

* 	[.screenshot()](http://dalekjs.com/docs/actions.html#meth-screenshot)
	Macht einen Screenshot der aktuellen Seite. Bei Verwendung von PhantomJS 	wird die gesamte Seite als Bild abgespeichert, bei Verwendung eines 	anderen Browsers der aktuelle sichtbare Viewport.

		// creates 'my/folder/my_file.png'
		test.screenshot('my/folder/my_file');


###»Assertions« – Überprüfung unser Erwartungen

Eine komplette Auflistung aller zu verwendenden Assertions-Methoden findet ihr in der [DalekJS Dokumentation](http://dalekjs.com/docs/assertions.html).

Bei Assertions die HTML-Elemente betreffen (vorhanden, sichtbar, disabled usw.) findet analog zu den »Actions« ebenfalls via CSS Selektoren Verwendung.

Assertions erwarten nebem dem zu überprüfenden Element/Text/etc einen weiteres Argument, welches dem Test-Report als informative Ausgabe dient:

	.assert.title().is('Mein Seitentitel', 'Seitentitel is korrekt')

Nachfolgend ein kleiner Auszug der subjektiv wichtigsten Methoden:

* 	[.exists()](http://dalekjs.com/docs/assertions.html#meth-exists)
	Prüft das vorhandensein eines DOM Elementes.

		.assert.exists('#Logout', 'Logout Button ist vorhanden')

* 	[.text()](http://dalekjs.com/docs/assertions.html#meth-text)
	Prüft den Textinhalt eines Elementes.

		.assert.text('h1', 'Erwartete Headline', 'Headline ist korrekt')

* 	[.val()](http://dalekjs.com/docs/assertions.html#meth-val)
	Prüft den value eines Formular-Elementes.

		.assert.val('#mySelect', 'null', 'Default Value ist korrekt')

* 	[.chain()](http://dalekjs.com/docs/assertions.html#meth-chain)
	Ermöglicht das aneinderketten mehrerer Assertions. Wir können also anstatt:

	```javascript
 	test.open('http://doctorwhotv.co.uk/')
      .assert.text('#nav').is('Navigation')
   	  .assert.visible('#nav')
      .assert.attr('#nav', 'data-nav', 'true')
   .done();
	```
	folgendes schreiben:

	```javascript
 	test.open('http://doctorwhotv.co.uk/')
     .assert.chain()
       .text('#nav').is('Navigation')
       .visible('#nav')
       .attr('#nav', 'data-nav', 'true')
     .end()
     .done();
	```


<a name="einsatz-mit-verschieden-Browsern"></a>
##Einsatz mit verschieden Browsern
Per Default laufen die Test im PhantomJS. Dabei handelt es sich um einen headless Webkit Browser (Läuft fensterlos im Terminal).

Die Verwendung anderer Browser ist über [Plugins](http://dalekjs.com/pages/documentation.html#browsers) gelöst wie z.B. [dalek-browser-chrome](https://github.com/dalekjs/dalek-browser-chrome) für Chrome gelöst.

Nach Installation eines »Browsers« lassen sich die Tests mit Parametern für Browser aufrufen. Z.B.:

	dalek tests/firstTests.js -b chrome

<a name="alternative-reports"></a>
##Alternative Reports
Per default landet der Test-Report im Terminal. Über [Plugins](http://dalekjs.com/pages/documentation.html#reports) lassen sich weitere Report-Formate wie z.B. [dalek-reporter-html](https://github.com/dalekjs/dalek-reporter-html) installieren.

Nach der Installation lassen sich die Tests mit Parametern für verschiedene Reporter aufrufen. Z.B.:

	dalek test/firstTests.js -r console,html

##Tipps

<a name="selector-engine"></a>
### Selector Engine
DalekJS verwendet immer die Selector Engine des verwendeten Browsers.

PhantomJS scheint eine ältere Version von Webkit zu verwenden welche anscheinden die selben CSS Selektoren bietet wie Safari 5.1
Das heißt **keine** Unterstützung von Pseudo-Selektoren wie `:first-child` beim testen mit PhantomJS.

###Bug der `setValue()` Methode

Die Methode `setValue()` lässt sich nicht ausführen. Sie dient dazu Values von Formular-Elementen zu setzen (bzw. zu überschreiben).

Der Bug ist inzwischen gefixed, aber noch nicht im aktuellsten Release drin.
Siehe <https://github.com/dalekjs/dalek/issues/77>

**Workarounds:**

1. Alternativ lässt sich die `type()` Methode verwenden. Problem hierbei: Wenn das Formularfeld schon einen Value beinhaltet schreibt `type()` hinter dem bestehenden Value weiter. Wichtig bei gespeicherten Benutzernamen!
2. Mit der Methode `execute()` lässt sich via Callback Function beliebiger JavaScript Code im Context der Seite aufrufen. Wenn jQuery in der zu testenden Seite vorhanden ist kann es natürlich auch verwendet werden:

```javascript
.execute(function () {
	$('#_58_login, #_58_password').val('');
})
