insert into course(id, title, trainer, organizer, date, location, targetAudience, link, image) values (hibernate_sequence.NEXTVAL, 'Quarkus Into', 'Tim Trainer', 'Otto Organizer', '2020-01-01T20:00:00', 1, 'alle', 'http://tarent.de', X'01FF');
insert into course(id, title, trainer, organizer, date, location, targetAudience, link, image) values (hibernate_sequence.NEXTVAL, 'Quarkus for Spring Devs', 'Theo Trainer', 'Oskar Organizer', '2020-01-02T20:00:00', 2, 'devs', 'http://tarent.de', X'00FF');

insert into course_labels(course_id, labels) values (1, 'Intro');
insert into course_labels(course_id, labels) values (1, 'Dev');
insert into course_labels(course_id, labels) values (2, 'Advanced');
insert into course_labels(course_id, labels) values (2, 'Dev');