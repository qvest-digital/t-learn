package de.tarent.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import de.tarent.config.UtcOffsetDateTimeSerializer;
import de.tarent.validator.StartDateBeforeEndDate;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.OffsetDateTime;

import static javax.persistence.EnumType.STRING;
import static javax.validation.constraints.Pattern.Flag.CASE_INSENSITIVE;

@Entity
@StartDateBeforeEndDate
public class Course extends PanacheEntity {

    @NotBlank
    @Length(max = 255)
    public String title;
    @NotBlank
    @Length(max = 255)
    public String trainer;
    @Length(max = 255)
    public String organizer;
    @JsonSerialize(using = UtcOffsetDateTimeSerializer.class)
    public OffsetDateTime startDate;
    @JsonSerialize(using = UtcOffsetDateTimeSerializer.class)
    public OffsetDateTime endDate;
    @Enumerated(STRING)
    public CourseForm courseForm;
    @NotNull
    @Enumerated(STRING)
    public CourseType courseType;
    @Length(max = 255)
    public String price;
    @Enumerated(STRING)
    public Location location;
    @Length(max = 255)
    public String address;
    @Length(max = 2000)
    public String targetAudience;
    @Length(max = 2000)
    public String description;
    @Pattern(regexp = "https?\\W.*", flags = CASE_INSENSITIVE, message = "protocol must be \"http\" or \"https\"")
    @URL
    @Length(max = 1000)
    public String link;
    @JsonIgnore
    public Boolean deleted;

    public enum CourseForm {
        CERTIFICATION,
        CONFERENCE,
        LANGUAGE_COURSE,
        LECTURE,
        MEETUP,
        SEMINAR,
        STUDY_GROUP,
        WORKSHOP
    }

    public enum CourseType {
        EXTERNAL, INTERNAL
    }

    public enum Location {
        REMOTE, ONSITE
    }
}
