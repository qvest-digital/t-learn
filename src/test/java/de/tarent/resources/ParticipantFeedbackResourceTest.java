package de.tarent.resources;

import de.tarent.entities.Course;
import de.tarent.entities.ParticipantFeedback;
import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.util.Set;

import static io.restassured.RestAssured.given;
import static java.time.temporal.ChronoUnit.SECONDS;
import static javax.ws.rs.core.HttpHeaders.ACCEPT;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
class ParticipantFeedbackResourceTest {

    @Test
    public void testGetAllParticipantFeedbackForCourse() {
        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/1/feedback")
                .then()
                .statusCode(200)
                .body("participant_name", contains("Freddy Feedback"))
                .body("likes", contains("interesting framework"))
                .body("dislikes", contains("short live coding session"))
                .body("recommendation", contains(true))
                .body("any { it.any { it.key == 'id' }}", is(false))
                .body("any { it.any { it.key == 'feedbackTime' }}", is(false));
    }

    @Test
    public void testGetAllParticipantFeedback_UnknownCourse() {
        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/-1/feedback")
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    public void testGetAllParticipantFeedback_DeletedCourse() {

        final long deletedCourseId = 3L;
        assertTrue(Course.<Course>findById(deletedCourseId).deleted);

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/{deletedCourseId}/feedback", deletedCourseId)
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    @Order(1)
    public void testGetAllParticipantFeedback_NoFeedback() {
        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/2/feedback")
                .then()
                .statusCode(200)
                .body("$", is(empty()));
    }

    @Test
    @TestTransaction
    public void testCreateNewFeedback() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/2/feedback")
                .then()
                .statusCode(201)
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .body("participant_name", equalTo("A concerned participant"))
                .body("likes", equalTo("apples"))
                .body("dislikes", equalTo("oranges"))
                .body("recommendation", is(true));

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/2/feedback")
                .then()
                .statusCode(200)
                .body("participant_name", contains("A concerned participant"))
                .body("likes", contains("apples"))
                .body("dislikes", contains("oranges"))
                .body("recommendation", contains(true))
                .body("any { it.any { it.key == 'id' }}", is(false));

        final Set<ParticipantFeedback> feedback = Course.<Course>findById(2L).participantFeedback;
        assertThat(feedback).hasSize(1);
        assertThat(feedback.iterator().next().feedbackTime).isCloseToUtcNow(within(2, SECONDS));
    }

    @Test
    @TestTransaction
    public void testCreateNewFeedback_FailedValidation() {

        final ParticipantFeedback participantFeedback = new ParticipantFeedback();
        participantFeedback.participant_name = RandomStringUtils.random(256);
        participantFeedback.likes = RandomStringUtils.random(2001);
        participantFeedback.dislikes = RandomStringUtils.random(2001);

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/2/feedback")
                .then()
                .statusCode(400)
                .body("message", allOf(
                        containsString("participant_name length must be between 0 and 255"),
                        containsString("likes length must be between 0 and 2000"),
                        containsString("dislikes length must be between 0 and 2000"),
                        containsString("recommendation must not be null")))
                .body("success", is(false));
    }

    @Test
    @TestTransaction
    public void testCreateNewFeedback_UnknownCourse() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/-1/feedback")
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    @TestTransaction
    public void testCreateNewFeedback_DeletedCourse() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/3/feedback")
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    private ParticipantFeedback buildValidFeedback() {
        final ParticipantFeedback participantFeedback = new ParticipantFeedback();
        participantFeedback.participant_name = "A concerned participant";
        participantFeedback.likes = "apples";
        participantFeedback.dislikes = "oranges";
        participantFeedback.recommendation = true;
        return participantFeedback;
    }
}