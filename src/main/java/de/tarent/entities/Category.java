package de.tarent.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.List;

@Data
@Entity
public class Category extends PanacheEntity {

    @Length(max = 255)
    String name;

    @ManyToMany(mappedBy = "categoryList")
    List<Course> courses;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
