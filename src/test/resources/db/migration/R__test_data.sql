insert into course(id, title, trainer, organizer, startDate, endDate, courseType, location, address, targetAudience, link, deleted)
values (hibernate_sequence.NEXTVAL, 'Quarkus Into', 'Tim Trainer', 'Otto Organizer', '2020-01-01T21:00:00+01:00', '2020-01-01T22:00:00+01:00', 'EXTERNAL', 'REMOTE', 'Rochusstraße 2-4, 53123 Bonn', 'alle', 'http://tarent.de', false);

insert into course(id, title, trainer, organizer, startDate, endDate, courseType, location, address, targetAudience, link, deleted)
values (hibernate_sequence.NEXTVAL, 'Quarkus for Spring Devs', 'Theo Trainer', 'Oskar Organizer', '2020-01-02T21:00:00+01:00', '2020-01-02T22:00:00+01:00', 'INTERNAL', 'ONSITE', 'Dickobskreuz, 53123 Bonn', 'devs', 'http://tarent.de', null);

insert into course(id, title, trainer, courseType, deleted)
values (hibernate_sequence.NEXTVAL, 'Deleted Course', 'Deleted Trainer', 'INTERNAL', true);