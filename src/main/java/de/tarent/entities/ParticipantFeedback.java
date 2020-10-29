package de.tarent.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

@Entity
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(value = {"id"}, ignoreUnknown = true)
public class ParticipantFeedback extends PanacheEntity {

    @Length(max = 255)
    public String participant_name;
    @Length(max = 2000)
    public String likes;
    @Length(max = 2000)
    public String dislikes;
    @NotNull
    public Boolean recommendation;
    @NotNull
    public OffsetDateTime feedbackTime;
}
