create table Course
(
    id             int8 not null,
    address        varchar(255),
    courseType     varchar(255),
    deleted        boolean,
    startDate      timestamp,
    endDate        timestamp,
    link           varchar(1000),
    location       varchar(255),
    organizer      varchar(255),
    targetAudience varchar(2000),
    title          varchar(255),
    trainer        varchar(255),
    primary key (id)
);

create sequence hibernate_sequence start 1 increment 1