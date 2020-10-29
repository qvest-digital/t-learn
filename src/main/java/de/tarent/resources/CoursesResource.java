package de.tarent.resources;

import de.tarent.entities.Course;
import io.quarkus.hibernate.orm.panache.runtime.JpaOperations;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.function.Predicate;

import static io.quarkus.panache.common.Sort.ascending;
import static java.lang.Boolean.TRUE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;

@Path("/courses")
@Transactional
public class CoursesResource {

    static final Response NOT_FOUND_RESPONSE = Response.status(NOT_FOUND).build();

    @GET
    @Produces(APPLICATION_JSON)
    @Path("{id}")
    public Response get(@PathParam("id") Long id) {
        return Course.<Course>findByIdOptional(id)
                .filter(notDeleted())
                .map(course -> {
                    course.mapToCategoryNames();
                    return Response.ok(course).build();
                })
                .orElse(NOT_FOUND_RESPONSE);
    }

    @GET
    @Produces(APPLICATION_JSON)
    public Response list() {
        final List<Course> courses = Course.list("deleted = false or deleted is null", ascending("title", "startDate"));
        courses.forEach(Course::mapToCategoryNames);
        return Response.ok(courses).build();
    }

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Response add(Course course) {
        course.id = null;
        course.mapToKnownCategories();
        course.persistAndFlush();
        course.mapToCategoryNames();
        return Response.status(CREATED).entity(course).build();
    }

    @PUT
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") Long id, Course course) {
        return Course.<Course>findByIdOptional(id)
                .filter(notDeleted())
                .map(origCourse -> {
                    course.id = id;
                    course.mapToKnownCategories();
                    JpaOperations.getEntityManager().merge(course);
                    return Response.noContent().build();
                }).orElse(NOT_FOUND_RESPONSE);
    }

    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") Long id) {
        Course.<Course>findByIdOptional(id)
                .ifPresent(course -> {
                    course.deleted = true;
                    course.persistAndFlush();
                });
    }

    static Predicate<Course> notDeleted() {
        return course -> !TRUE.equals(course.deleted);
    }
}
