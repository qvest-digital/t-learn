create table participantfeedback
(
    id               int8 not null,
    course_id        int8 not null,
    participant_name varchar(255),
    likes            varchar(2000),
    dislikes         varchar(2000),
    recommendation   boolean,
    feedbackTime     timestamp,
    primary key (id),
    foreign key (course_id) references course (id)
);