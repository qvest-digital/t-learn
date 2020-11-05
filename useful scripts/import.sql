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


COPY data_import FROM 'veranstaltungen.csv' WITH (FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF-8');


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