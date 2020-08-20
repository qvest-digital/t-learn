package de.tarent.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.net.URL;
import java.time.LocalDateTime;

import static javax.persistence.EnumType.STRING;

@Entity
public class Course extends PanacheEntity {

    @NotBlank
    public String title;
    @NotBlank
    public String trainer;
    public String organizer;
    public LocalDateTime startDate;
    public LocalDateTime endDate;
    @Enumerated(STRING)
    public CourseType courseType;
    @Enumerated(STRING)
    public Location location;
    public String address;
    public String targetAudience;
    public URL link;

    public enum CourseType {
        EXTERNAL, INTERNAL
    }

    public enum Location {
        REMOTE, ONSITE
    }
}
