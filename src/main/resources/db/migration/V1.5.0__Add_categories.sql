create table category
(
    id             int8 not null,
    name           varchar(255) unique,
    primary key (id)
);

create table course_category
(
    category_id     int8 not null,
    course_id     int8 not null,

    primary key (category_id, course_id),
    foreign key (category_id) references category (id),
    foreign key (course_id) references course (id)
);
