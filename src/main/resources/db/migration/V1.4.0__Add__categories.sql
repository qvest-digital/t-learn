create table Category
(
    id             int8 not null,
    name           varchar(255),
    primary key (id)
);

create table Course_Category
(
    category_id     int8 not null,
    course_id     int8 not null,

    primary key (category_id, course_id),
    foreign key (category_id) references Category (id),
    foreign key (course_id) references Course (id)
);
