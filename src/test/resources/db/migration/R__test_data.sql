insert into course(id, title, organizer, contactPerson, startDate, endDate, courseForm, courseType, price, executionType, address, targetAudience, link, deleted)
values (hibernate_sequence.NEXTVAL, 'Quarkus Into', 'Tim Organizer', 'Otto ContactPerson', '2020-01-01T21:00:00+01:00', '2020-01-01T22:00:00+01:00', 'CERTIFICATION', 'EXTERNAL', '100€', 'REMOTE', 'Rochusstraße 2-4, 53123 Bonn', 'alle', 'http://tarent.de', false);

insert into course(id, title, organizer, contactPerson, startDate, endDate, courseForm, courseType, price, executionType, address, targetAudience, link, deleted)
values (hibernate_sequence.NEXTVAL, 'Quarkus for Spring Devs', 'Theo Organizer', 'Oskar ContactPerson', '2020-01-02T21:00:00+01:00', '2020-01-02T22:00:00+01:00', 'CONFERENCE','INTERNAL', 'free', 'ONSITE', 'Dickobskreuz, 53123 Bonn', 'devs', 'http://tarent.de', null);

insert into course(id, title, organizer, courseType, deleted)
values (hibernate_sequence.NEXTVAL, 'Deleted Course', 'Deleted Organizer', 'INTERNAL', true);

insert into category(id, name)
values (category_sequence.NEXTVAL, 'great category');

insert into category(id, name)
values (category_sequence.NEXTVAL, 'good category');

insert into course_category(category_id, course_id) values
( (select id from category where name = 'good category'), (select id from course where title = 'Quarkus Into') );

insert into participantfeedback(id, course_id, participant_name, likes, dislikes, recommendation, feedbackTime)
values (hibernate_sequence.NEXTVAL, (select id from course where title = 'Quarkus Into'), 'Freddy Feedback',
        'interesting framework', 'short live coding session', true, '2020-01-02T21:00:00+02:00');