package de.tarent.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Course extends PanacheEntity {

    @NotBlank
    public String title;
    @NotBlank
    public String trainer;
    public String organizer;
    public LocalDateTime date;
    public Location location;
    public String targetAudience;
    public URL link;
    @Lob
    public byte[] image;
    @ElementCollection
    public Set<String> labels;

    public enum Location {
        REMOTE, EXTERN, INTERN
    }
}
