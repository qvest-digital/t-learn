package de.tarent.resources;

import de.tarent.entities.Course;
import de.tarent.entities.ParticipantFeedback;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.time.OffsetDateTime;
import java.util.Optional;

import static de.tarent.resources.CoursesResource.IS_NOT_DELETED;
import static de.tarent.resources.CoursesResource.NOT_FOUND_RESPONSE;
import static de.tarent.resources.ParticipantFeedbackResource.COURSE_ID;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.CREATED;

@Path("/courses/{" + COURSE_ID + "}/feedback")
@Transactional
public class ParticipantFeedbackResource {

    static final String COURSE_ID = "courseId";

    @GET
    @Produces(APPLICATION_JSON)
    public Response list(@PathParam(COURSE_ID) long courseId) {
        return getCourse(courseId)
                .map(course -> Response.ok(course.participantFeedback).build())
                .orElse(NOT_FOUND_RESPONSE);
    }

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Response add(@PathParam(COURSE_ID) long courseId, ParticipantFeedback participantFeedback) {
        participantFeedback.id = null;
        return getCourse(courseId)
                .map(course -> {
                    participantFeedback.feedbackTime = OffsetDateTime.now();
                    course.participantFeedback.add(participantFeedback);
                    course.persistAndFlush();
                    return Response.status(CREATED).entity(participantFeedback).build();
                }).orElse(NOT_FOUND_RESPONSE);
    }

    private Optional<Course> getCourse(long courseId) {
        return Course.<Course>findByIdOptional(courseId)
                .filter(IS_NOT_DELETED);
    }
}
