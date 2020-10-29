package de.tarent.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import de.tarent.config.UtcOffsetDateTimeSerializer;
import de.tarent.validator.StartDateBeforeEndDate;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;
import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.validation.constraints.Pattern.Flag.CASE_INSENSITIVE;

@Entity
@StartDateBeforeEndDate
@EqualsAndHashCode(exclude = {"categoryList", "participantFeedback"})
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class Course extends PanacheEntity {

    @NotBlank
    @Length(max = 255)
    public String title;
    @NotBlank
    @Length(max = 255)
    public String organizer;
    @Length(max = 255)
    public String contactPerson;
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
    public ExecutionType executionType;
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

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "course_category",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    public List<Category> categoryList;

    @JsonIgnore
    @OneToMany(cascade = ALL)
    @JoinColumn(name = "course_id", nullable = false)
    public Set<ParticipantFeedback> participantFeedback;

    @Transient
    public List<String> categoryNames;

    public void mapToKnownCategories() {
        if (categoryNames != null && !categoryNames.isEmpty()) {
            categoryList = Category.list("name IN ?1", categoryNames);
        }
    }

    public void mapToCategoryNames() {
        categoryNames = ofNullable(categoryList)
                .map(categoryList -> categoryList.stream().map(category -> category.name).collect(toList()))
                .orElse(emptyList());
    }

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

    public enum ExecutionType {
        REMOTE, ONSITE
    }
}
