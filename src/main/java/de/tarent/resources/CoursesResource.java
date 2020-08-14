package de.tarent.resources;

import de.tarent.entities.Course;
import io.quarkus.hibernate.orm.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;

import javax.transaction.Transactional;

@ResourceProperties(hal = true)
@Transactional
public interface CoursesResource extends PanacheEntityResource<Course, Long> {
}
