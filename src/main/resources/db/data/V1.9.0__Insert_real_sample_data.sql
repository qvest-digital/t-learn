-- content of the /useful scripts/import.sql plus 20 rows of sample data


CREATE TEMP TABLE data_import (
	nr TEXT,
	veranstaltungart TEXT,
	veranstaltungsform TEXT,
	titel TEXT,
	anbieter TEXT,
	organisator TEXT,
	startzeitpunkt TEXT,
	endzeitpunkt TEXT,
	ort TEXT,
	durchführung TEXT,
	beschreibung TEXT,
	zielgruppe TEXT,
	link TEXT,
	kategorien TEXT,
	preis TEXT,
	weiterempfehlung_ja TEXT,
	weiterempfehlung_nein TEXT,
	feedback_positiv TEXT,
	feedback_negativ TEXT
);


COPY data_import FROM STDIN WITH (FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF-8');
Nr,"VeranstaltungArt: Extern, Intern",Veranstaltungsform,Titel / Thema (Freitext),(Trainer -> neu:) Anbieter (extern oder mein Name),Organisator (optional) (Freitext),StartZeitpunkt: Datum + Zeit (optjonal) Datumsauswahl) => einmaliger Termin,EndZeitpunkt: Datum Zeit (optjonal) (Datumsauswahl) (> StartDatumZeit),Ort,"Durchführung: Remote, Präsenz (optional)",Beschreibung (Worum geht es?),Zielgruppe (optional) - An wen richtet sich die Veranstaltung? (Freitext),Link zu weiterführenden Informationen (Link) (optional),Kategorien/Labels : Auswahl,Preis (Freitext) (optional),Weiterempfehlung (ja),Weiterempfehlung (nein),Feedback positiv (Freitext),Feedback negativ (Freitext)
1,extern,Seminar,Rhetorik,Feedback People,Tamara,7.9.2020,8.9.2020,"tarent, Bonn","Remote, Präsenz",Präsentationstechniken und Storytelling sowie Auftreten und Gesprächsführung erlernen.,Vertriebler; Führungskräfte;Trainer,www.feedback-people.de,Business Skills; Kommunikation; Präsentation; Storytelling;,kostenpflichtig,-,-,-,-
2,extern,Seminar,Moderation,Ralf Drittner,Tamara,6.2.2020,,"tarent, Bonn",Präsenz,"Erlernen von Methoden; Techniken/inhaltlicher Aufbau;
Konflikte lösen;","PO;PL,Führungskräfte;",https://www.drittner-training.de/DT-wir_Trainerprofil%20Ralf%20Drittner.html,Business Skills; Kommunikation; Methodik;Moderation;Moderationstechnik,kostenpflichtig,3,1,"Simulationen und Übungen am Nachmittag | Das wir nicht bei 0 gestartet sind, sondern die bereits vorhandenen Erfahrungen berücksichtigt wurden und wir so direkt in die Komplexeren Themen wie Konflikte eingestiegen sind | Vorbereitung, Simulation als Rollenspiel | Die 2 Trainer fand ich gut. Sowohl die Art der Schulung als auch den Umstand, dass Sie zu zweit waren. Es wirkte zu keinem Zeitpunkt abstrakt, sondern war immer konkret und am Thema | Flexibilität der Referentin die Inhalte an das Erfahrungslevel der Teilnehmer anzupassen |  als Übung war das Rollenspiel am besten | Die Testszenarien und die Diskussionen über die Moderation von schwierigen Situationen | Ich habe sehr viel gelernt und auch meine persönlichen Schmerzpunkte zum Thema Moderation wurden ausführlich angesprochen und geklärt. Die Kursleiter haben sich auf die TN eingelassen und den Workshop am Bedarf ausgerichtet (das Thema Remote-Moderation kam glaube ich nicht ausführlich genug dran - dafür bräuchte man aber wohl auch mehr Zeit). Ich fand den Workshop sehr gut und hilfreich und die Moderatoren waren sehr sympathisch und haben das toll gemacht. Vielen Dank | Fundiertes, breit gefächertes Wissen der Workshopleiter, gute Gruppe, gute Vorbereitung und genug Materialien","Erste Tageshälfte theorielastig ... Workshops sollten hands on sein | Das sie gefühlt etwas kurz war. Hier wäre ggf. noch ein zweiter Tag sinnvoll gewesen | - | Die Zeit war zu knapp, um die Grundlegenden Konzepte zu besprechen. Es wäre auch schön gewesen, wenn jeder die Chance gehabt hätte, sich bei der Moderation auszuprobieren. 

Die Trainer meinten zu Beginn, dass sie den Workshop sonst mit 3 Tagen anbieten - das macht aus meiner Sicht Sinn! | nichts | - | Dass wir nur einen Tag hatten und dann leider auch nicht bis 17 durchgekommen sind (leider musste ich pünktlich weg). Es wäre schön, wenn die tarent auch anbieten würde, mehrtägige Workshops zu machen. Vor allem, wenn die Kursleiter von Anfang an sagen, dass ein Tag für den Umfang an Inhalt sehr knapp ist. | Ein solider Workshop aber nicht tief genug, wir hätten mehrere Tage gebraucht"
3,extern,Konferenz,Manage Agile,Manage Agile,HLMC Events GmbH,24.11.2020,,,Remote,Agile Projekte und agile Denkweisen;Zielsetzung im Unternehmen; agile Führungsmodell-und methoden;Agilität als Wettbewerbsvorteil,Führungskräfte;Trainer;,https://www.manage-agile.de/konferenz.html,Agilität;Agile Methoden;Agile Führung;,890 Euro,-,-,-,-
4,intern,Seminar,Kotlin Workshop,Christian,tarent,5.8.2019,,"tarent, Bonn",Präsenz,Einführungsworkshop Kotlin,Entwickler,,Programmiersprachen,kostenfrei,-,-,-,-
5,extern,Seminar,OKR Master Zertifizierung,die.agilen,XING Events GmbH,21.07.2020,,,"Remote, Präsenz","Agiles Mindset, Rolle des OKR Masters, Umfassende Vermittlung des OKR-Frameworks, Kurz/Mittel/Langfrist-Ziele (OKR/Moals/Leitbild), Methoden, Praxisbeispiele, Change Management",Führungskräfte;Trainer; Coach,https://www.die-agilen.de/portfolio,OKR;OKR Master; OKR Modell;Methode;OKR Framework,1755 Euro,-,-,-,-
6,extern,Seminar,OKR Schulung,Rausch Unternehmensberatung,Tamara,28.02.2020,,"tarent, Bonn",Präsenz,"Agiles Mindset, Rolle des OKR Masters, Umfassende Vermittlung des OKR-Frameworks, Kurz/Mittel/Langfrist-Ziele (OKR/Moals/Leitbild), Methoden, Praxisbeispiele, Change Management",Führungskräfte;Trainer; Coach,https://www.okr.digital/Stefan%20Rausch.html,OKR;OKR Master; OKR Modell;Methode;OKR Framework,kostenpflichtig,5,0,"Die praktischen Übungen waren sehr hilfreich und die Erfahrungen des Trainers bei Change-Projekten interessant | Das Einüben der Methode mit den Kollegen | Guter Trainer, viele Praxisbeispiele, Abwechslung zwischen Vortrag und Interaktion | Die praktischen Übungen zur Formulierung eigener Objectives und Key Results |  die Planung potentieller nächster Schritte für die tarent | Fachliches Wissen und Didaktik","Der externe Trainer war nicht der sympathischste, das Lehrmaterial hatte einige Fehler und war visuell nicht besonders ansprechend | Das Einüben der Methode mit den Kollegen | Guter Trainer, viele Praxisbeispiele, Abwechslung zwischen Vortrag und Interaktion | Die theoretische ""Druckbetankung"" ganz am Anfang | Unklare Organisation von Verpflegung/Kekse etc."
7,extern,Seminar,Stimmtraining,"Stimm-, Sprech- und Medientraining Ien Svea Bäumler",,,,"tarent, Bonn","Remote,Präsenz",Stimm-und Sprechwirkung;Professionelles Sprechen;akzent-und dialektfrei sprechen;Sprechängste,jeder,https://www.sprechkompetenz.com/,Kommunikation;Sprache;Soft Skills;Selbstdarstellung;,kostenpflichtig,1,0,"Expertise der Trainerin, Trainingsmethoden, Lerninhalte, Enthusiasmus der Trainerin",-
8,extern,Konferenz,Javaland,JavaLand GmbH,,16.3.2020,,Brühl,Präsenz,Java-Technologie,Entwickler,https://www.javaland.eu/de/home/,Java;Technologie;Programmieren;,kostenpfilichtig,-,,-,-
9,extern,Konferenz,Droidcon,DroidCon Berlin,,8.10.2020,9.10.2020,Berlin,Präsenz,Android-technologie;Mobile Anwendung;,Entwickler,https://www.berlin.droidcon.com/,technologie;Mobile;,kostenpflichtig,-,-,-,-
10,extern,Seminar,Financial &Management Accounting Stufe 2,CA Akademie privates Institut für Controlling und Unternehmensführung AG,,,,Starnberg,Präsenz,"Vorgehensweise zum Aufbau der Planbilanz (Stolpersteine, vereinfachende Annahmen) inkl. direkter Ermittlung der Liquidität;
Risiko-Check der Planung: Volatilität mittels Szenario-Technik und Monte-Carlo-Simulation abbilden
Finanzmanagement und Working Capital verbinden",Controller,https://www.controllerakademie.de/seminar/controlling/controllers-trainingsprogramm/stufe-2-financial-management-accounting/,Controlling;Unternehmenssteuerung;Vertriebscontrolling;Rechnungswesen,"kostenpflichtig
1880 Euro",-,-,"Klausurcharakter - den ganzen Tag Programm und Austausch, auch nach dem Abendessen.",-
11,extern,Seminar,Deutschkurs,Berlitz Bonn,Berlitz Bonn,1.8.2020,1.11.2020,,Remote,Erlernen/Verbesserung der deutschen Sprache,"jeder, der Sprachprobleme hat",https://sprachkurse.berlitz.de/?utm_source=google&utm_medium=cpc&utm_campaign=DE|GG|SN|BR|AL|F2F|DE|CITY_All|Berlitz%20Center_All|&gclid=EAIaIQobChMI0tetztzX6wIVY7R3Ch3nMQzMEAAYASAAEgLMYvD_BwE,Kommunikation;Sprache;Deutsch;Sprachkenntnisse;Softs Skills,kostenpflichtig,,,,
12,extern,Seminar,Reisekosten- und Bewirtungsrecht 2020,Akademie Herkert - Forum Verlag Herkert GmbH,,,,Köln,Präsenz,"Aktuelle Reisekosten-und Bewirtungrechte in 2020/2021;Absenkung der Umsatzsteuersätze ab 01.07.2020
Auswirkungen Corona: Home-Office Regelungen, Reisekosten z.B. Bahn – Tickets, Firmenfahrzeuge, geringe betriebliche Nutzung der Bahn-Card, Steuerfreie Corona-Prämie",Buchhaltung,https://www.akademie-herkert.de/themenuebersicht/personal-ausbildung-recht/621-das-aktuelle-reisekosten-und-bewirtungsrecht-1,Bewirtungskosten;Reisekosten;Hard Skills;Buchhaltung,655 Euro,,,,
13,extern,Seminar,Teams leiten und entwickeln,neues lernen,neues lernen,5.2.2020,7.2.2020,Köln,Präsenz,Methoden der Teamführung und Aufbau und Entwickung der Einzelnen im team,Führungskräfte,https://www.neues-lernen.info/index.php?seite=seminarprogramm&kapitel=00003,Führung;Führungsstil;Soft Skills;Führungsmethode;Kommunikation im Team,290 Euro,,,,
14,extern,Seminar,Usability Experte,Usability Academy,,9.3.2020,13.3.2020,Köln,Präsenz,,,,,,,,,
15,intern,workshop,Trainer Workshop,"Corinna, Adrian",,29.11.2019,,"tarent, Bonn",Präsenz,"Organisation
Didaktischer Aufbau
Einführung, Erarbeitung, (Lern-)Ergebnissicherung
Methoden für die Inhaltsvermittlung
Moderationsskills
Umgang mit Konflikten und heterogenen Lerngruppen",(angehende) Trainer,,,,,,,
16,intern,workshop,Feedback  geben und nehmen,Raphaela Faust,,,,"tarent, Bonn",Präsenz,"Methoden erlernen:Wie gibt man feedback, wie etabliert man es im Tagesgeschäft/Team; wie schaffe ich eine Feedbackkultur","jeder, der Interesse hat",,,,,,,
17,extern,training,Active-Sourcing,Die Grüne3,,28.9.2020,2.10.2020,,Remote,Wie erreicht man die passende Zielgruppe? Direkte Ansprache und persönlicher Austausch ;Boolesche und Semantische Suche und XING Talent Manager,Recruiter,https://diegruene3.de/training/,Active-Sourcing;Personalstrategie;,1050 Euro,,,,
18,extern,Konferenz,Fachmesse für digitales Marketing & Werbung,DMEXCO@home,Kölnmesse GmbH,23.9.2020,24.9.2020,,Remote,"Fokussiertes Networking und intensiver Austausch mit der globalen Community;zentraler Treffpunkt aller wichtigen Entscheidungsträger aus digitaler Wirtschaft, Marketing und Innovation;
Vorträgen internationaler Speaker, Ausstellungen von Top-Brands und praxisorientierten Seminaren – alle mit Blick auf digitale Trends und zukünftige Business-Potenziale",Markekting-Spezialisten;Vertriebler;,https://dmexco.com/de/dmexco-at-home/,Social Networking;Beziehungsmanagement;,79 Euro,,,,
19,extern,Zertifizierung,PROFESSIONAL SCRUM PRODUCT OWNER™ CERTIFICATIONS,Scrum.Org,,,,,Remote,,"PO, Scrum Master",https://www.scrum.org/professional-scrum-product-owner-certifications,Scrum Master;Scrum Zertifizierung;PSPO;,200$,,,,
20,extern,workshop,Oracle Database: Backup and Recovery Workshop Ed 1,Oracle,robotron,25.11.2019,29.11.2019,,Präsenz,"In diesem Workshop zu Backup- und Recovery-Verfahren der Oracle Datenbank 12c lernen Sie, wie Sie Ihre eigenen Recovery-Anforderungen bewerten. Sie entwickeln geeignete Strategien für Backup-, Restore- und Recovery-Verfahren aus den bereitgestellten Szenarios usw.",Entwickler,https://www.robotron.de/schulungszentrum/kurssuche/kursdetails/oracle-database-backup-and-recovery-workshop-ed-1,Oracle;Datenbanken;,3555 Euro,,,Der Kursleiter war sehr kompetent. Die Schulungsräume waren sehr gut ausgestattet. Bei der vorherigen Schulung in München bei der Fa. Fast Lane wurde sehr viel Zeit für die Installation von Zugangssoftware verbraucht.,"Die Unterkunft in einer Ferienwohnung bot viel Komfort, war aber auch mit viel Aufwand verbunden. Die Unterkunft war zirka 2km vom Schulungsort und nächsten Supermarkt entfernt (Fussweg) . Insgesamt war das aber noch okay. Die Organisation der Schulung war katastrophal. Ich wusste am Donnerstag nicht, ob ich am Montag in Dresden an der Schulung teilnehme oder nicht. Ich war zum Zeitpunkt in München auf einer anderen Schulung und musste ständig nachfragen, wie der Stand ist. Erst nach dem ich selbst bei der Fa. Robotron nachgefragt habe, ob ich angemeldet bin, ist es zu einer Zusage gekommen. Mir ist unklar was alles bei der Anmeldung der beiden Oracle Schulungen falsch gelaufen ist."
\.

ALTER TABLE data_import
ADD COLUMN insert_id bigint NOT NULL DEFAULT nextval('hibernate_sequence');



INSERT INTO course
SELECT
	insert_id AS id,
	ort AS address,
	CASE veranstaltungart
		WHEN 'extern' THEN 'EXTERNAL'
		ELSE 'INTERNAL'
	END AS coursetype,
	false AS deleted,
	TO_DATE(startzeitpunkt, 'DD.MM.YYYY') AS startdate,
	TO_DATE(endzeitpunkt, 'DD.MM.YYYY') AS enddate,
	link AS link,
	CASE
		WHEN durchführung LIKE 'Remote%' THEN 'REMOTE'
		WHEN durchführung LIKE 'Präsenz%' THEN 'ONSITE'
		ELSE NULL
	END AS executiontype,
	organisator AS contactperson,
	zielgruppe AS targetaudience,
	titel AS title,
	anbieter AS organizer,
	beschreibung AS description,
	preis AS price,
	CASE veranstaltungsform
		WHEN 'Zertifizierung' THEN 'CERTIFICATION'
		WHEN 'Konferenz' THEN 'CONFERENCE'
		WHEN 'Sprachkurs' THEN 'LANGUAGE_COURSE'
		WHEN 'Unterricht' THEN 'LECTURE'
		WHEN 'Meetup' THEN 'MEETUP'
		WHEN 'Seminar' THEN 'SEMINAR'
		WHEN 'training' THEN 'STUDY_GROUP'
		WHEN 'workshop' THEN 'WORKSHOP'
		ELSE NULL
	END AS courseform
FROM data_import;



INSERT INTO Category(id, name)
SELECT
	nextval('category_sequence'),
	cat
FROM
	(SELECT DISTINCT regexp_split_to_table (kategorien, '\s*;\s*') AS cat FROM data_import)t
WHERE char_length(cat) > 0
ON CONFLICT DO NOTHING;


INSERT INTO course_category
SELECT
	(SELECT id FROM category WHERE name=cat) AS cat,
	insert_id
FROM
	(SELECT DISTINCT insert_id, regexp_split_to_table (kategorien, '\s*;\s*') AS cat FROM data_import)t
WHERE char_length(cat) > 0
ON CONFLICT DO NOTHING;

DROP TABLE data_import;