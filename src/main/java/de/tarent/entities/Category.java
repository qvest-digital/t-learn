package de.tarent.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;

@Entity
@EqualsAndHashCode
@ToString
public class Category extends PanacheEntity {

    @Length(max = 255)
    public String name;
}