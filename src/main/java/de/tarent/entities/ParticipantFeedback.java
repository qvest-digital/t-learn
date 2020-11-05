package de.tarent.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import de.tarent.config.UtcOffsetDateTimeSerializer;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.OffsetDateTime;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY;

@Entity(name = "participant_feedback")
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(value = {"id"})
public class ParticipantFeedback extends PanacheEntity {

    @Length(max = 255)
    @Column(name = "participant_name")
    public String participantName;
    @Length(max = 2000)
    public String likes;
    @Length(max = 2000)
    public String dislikes;
    @NotNull
    public Boolean recommendation;
    @JsonProperty(access = READ_ONLY)
    @NotNull
    @Column(name = "feedback_time")
    @JsonSerialize(using = UtcOffsetDateTimeSerializer.class)
    public OffsetDateTime feedbackTime;
}
