# Choice-O-Mat

Auf dem Server sollte die Datei `.env_template` einfach kopiert und als `.env` umbenannt werden. Wenn die Anwendung durch den Befehl `docker compose up` gestartet wird, soll eine andere URL verwendet werden als bei einem direkten Start aus dem Terminal. Die benötigten Einstellungen sind in der Datei `.env_template` beschrieben.

Das Gleiche gilt für die Client-Datei, wobei hier keine Änderungen an den Links erforderlich sind.

In der lokalen Umgebung, also ohne Docker, startet man einfach im Client-Verzeichnis mit `npm start` und im Server-Verzeichnis mit `nodemon index.js` oder `node index.js`.

Zugriff auf die Website: [localhost:3005](http://localhost:3005)

Um Fragen zu ändern oder anzupassen, besuchen Sie [localhost:3005/question](http://localhost:3005/question).

Bei der ersten Initialisierung der Anwendung müssen unter dem oben genannten Link zunächst die Fragen angelegt werden (ansonsten weißer Screen). Um dies korrekt umzusetzen, gehen Sie zuerst zu "Question Types" und wählen "Predefined Question Types" aus. Danach gehen Sie zu "Question Result" und dann zu "Question", um diesen Vorgang zu wiederholen. Bei letzterem müssen für jede Frage spezifische Bilder und Lottie-Dateien ausgewählt werden. Diese finden sich im Ordner "assets" wieder. Eine Anleitung, welche Assets zu welcher Frage gehören, befindet sich ebenfalls in diesem Ordner.