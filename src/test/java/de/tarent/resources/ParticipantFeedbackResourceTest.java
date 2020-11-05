package de.tarent.resources;

import de.tarent.entities.Course;
import de.tarent.entities.ParticipantFeedback;
import io.quarkus.test.junit.QuarkusTest;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.Set;

import static io.restassured.RestAssured.given;
import static java.time.temporal.ChronoUnit.SECONDS;
import static javax.ws.rs.core.HttpHeaders.ACCEPT;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
class ParticipantFeedbackResourceTest {

    @Test
    @Order(1)
    public void testGetAllParticipantFeedbackForCourse() {

        final Course course = Course.<Course>find("title", "Quarkus Into")
                .firstResultOptional().orElseThrow();

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(200)
                .body("participantName", contains("Francis Feedbacker", "Freddy Feedback"))
                .body("likes", contains("great speaker", "interesting framework"))
                .body("dislikes", contains("catering", "short live coding session"))
                .body("recommendation", contains(false, true))
                .body("feedbackTime", contains("2020-01-03T15:00:00Z", "2020-01-02T19:00:00Z"))
                .body("any { it.any { it.key == 'id' }}", is(false));
    }

    @Test
    @Order(1)
    public void testGetAllParticipantFeedback_NoFeedback() {

        final Course course = findTestCourse();

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(200)
                .body("$", is(empty()));
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
    public void testGetAllParticipantFeedback_NoCourseGiven() {
        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses//feedback")
                .then()
                .statusCode(404);

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/feedback")
                .then()
                .statusCode(404);
    }

    @Test
    public void testGetAllParticipantFeedback_DeletedCourse() {

        final Course deletedCourse = Course.<Course>find("deleted", true)
                .firstResultOptional().orElseThrow();

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/{deletedCourseId}/feedback", deletedCourse.id)
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    public void testCreateNewFeedback() {

        final Course course = findTestCourse();
        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(201)
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .body("participantName", equalTo("A concerned participant"))
                .body("likes", equalTo("apples"))
                .body("dislikes", equalTo("oranges"))
                .body("recommendation", is(true))
                .body("feedbackTime", is(not(emptyString())));

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(200)
                .body("participantName", contains("A concerned participant"))
                .body("likes", contains("apples"))
                .body("dislikes", contains("oranges"))
                .body("recommendation", contains(true))
                .body("any { it.any { it.key == 'id' }}", is(false))
                .body("any { it.any { it.key == 'feedbackTime' }}", is(true));

        final Set<ParticipantFeedback> feedback = Course.<Course>findById(course.id).participantFeedback;
        assertThat(feedback).hasSize(1);
        assertThat(feedback.iterator().next().feedbackTime).isCloseToUtcNow(within(2, SECONDS));
    }

    @Test
    public void testCreateNewFeedback_SettingFeedbackTimeFromClientNotPossible() {

        final Course course = findTestCourse();
        final ParticipantFeedback participantFeedback = buildValidFeedback();
        participantFeedback.feedbackTime = OffsetDateTime.now(ZoneId.of("+1")).minusDays(1);

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(201)
                .body("participantName", equalTo("A concerned participant"))
                .body("likes", equalTo("apples"))
                .body("dislikes", equalTo("oranges"))
                .body("recommendation", is(true))
                .body("feedbackTime", is(not(participantFeedback.feedbackTime.toString())));
    }

    @Test
    public void testCreateNewFeedback_FailedValidation() {

        final Course course = findTestCourse();
        final ParticipantFeedback participantFeedback = new ParticipantFeedback();
        participantFeedback.participantName = RandomStringUtils.random(256);
        participantFeedback.likes = RandomStringUtils.random(2001);
        participantFeedback.dislikes = RandomStringUtils.random(2001);

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/{courseId}/feedback", course.id)
                .then()
                .statusCode(400)
                .body("message", allOf(
                        containsString("participantName length must be between 0 and 255"),
                        containsString("likes length must be between 0 and 2000"),
                        containsString("dislikes length must be between 0 and 2000"),
                        containsString("recommendation must not be null")))
                .body("success", is(false));
    }

    @Test
    public void testCreateNewFeedback_UnknownCourse() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/-1/feedback")
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    public void testCreateNewFeedback_DeletedCourse() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/3/feedback")
                .then()
                .statusCode(404)
                .body(is(emptyString()));
    }

    @Test
    public void testCreateNewFeedback_NoCourseGiven() {

        final ParticipantFeedback participantFeedback = buildValidFeedback();

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses//feedback")
                .then()
                .statusCode(404);

        given().body(participantFeedback).header(CONTENT_TYPE, APPLICATION_JSON)
                .when().post("/courses/feedback")
                .then()
                .statusCode(405);
    }

    private ParticipantFeedback buildValidFeedback() {
        final ParticipantFeedback participantFeedback = new ParticipantFeedback();
        participantFeedback.participantName = "A concerned participant";
        participantFeedback.likes = "apples";
        participantFeedback.dislikes = "oranges";
        participantFeedback.recommendation = true;
        return participantFeedback;
    }

    private Course findTestCourse() {
        return Course.<Course>find("title", "Quarkus for Spring Devs")
                .firstResultOptional().orElseThrow();
    }
}