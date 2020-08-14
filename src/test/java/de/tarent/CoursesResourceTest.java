package de.tarent;

import de.tarent.entities.Course;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Set;

import static de.tarent.entities.Course.Location.REMOTE;
import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@TestMethodOrder(OrderAnnotation.class)
public class CoursesResourceTest {

    @Test
    @Order(1)
    public void testGetAllCourses() {

        given().header("Accept", APPLICATION_JSON)
                .when().get("/courses")
                .then()
                .statusCode(200)
                .body("title", containsInAnyOrder("Quarkus Into", "Quarkus for Spring Devs"))
                .body("date", containsInAnyOrder("2020-01-01T20:00:00", "2020-01-02T20:00:00"))
                .body("labels", containsInAnyOrder(containsInAnyOrder("Dev", "Intro"), containsInAnyOrder("Dev", "Advanced")))
                .body("image", containsInAnyOrder("Af8=", "AP8="));

    }

    @Test
    public void testCreateNewCourse() throws MalformedURLException {

        final Course course = new Course();
        course.title = "CreatedQuarkusCourse";
        course.trainer = "Norbert Neutrainer";
        course.organizer = "Oskar Neuorganizer";
        course.date = LocalDateTime.parse("2020-01-03T21:00:00");
        course.location = REMOTE;
        course.targetAudience = "Alle";
        course.link = new URL("http://tarent.de");
        course.image = new byte[]{1, 2, 3, 4, 5, 6, 7};
        course.labels = Set.of("Dev", "Advanced");

        given().body(course).header("Content-Type", APPLICATION_JSON)
                .when().post("/courses")
                .then()
                .statusCode(201)
                .body("title", equalTo("CreatedQuarkusCourse"))
                .body("trainer", equalTo("Norbert Neutrainer"))
                .body("organizer", equalTo("Oskar Neuorganizer"))
                .body("date", equalTo("2020-01-03T21:00:00"))
                .body("location", equalTo("REMOTE"))
                .body("targetAudience", equalTo("Alle"))
                .body("link", equalTo("http://tarent.de"))
                .body("image", equalTo("AQIDBAUGBw=="))
                .body("labels", containsInAnyOrder("Dev", "Advanced"));

    }

    @Test
    public void testCreateNewCourse_FailedValidation() {

        final Course course = new Course();

        given().body(course).header("Content-Type", APPLICATION_JSON)
                .when().post("/courses")
                .then()
                .statusCode(400)
                .body("message", matchesPattern("(trainer|title) must not be blank, (trainer|title) must not be blank"))
                .body("success", is(false));

    }

    @Test
    public void testUpdateCourse() {

        final Course course = new Course();
        course.title = "UpdateableQuarkusCourse";
        course.trainer = "Dummy";

        final Integer id = given().body(course).header("Content-Type", APPLICATION_JSON)
                .when().post("/courses")
                .then()
                .statusCode(201)
                .body("title", equalTo("UpdateableQuarkusCourse"))
                .extract().path("id");

        course.title = "UpdatedQuarkusCourse";

        given().body(course).header("Content-Type", APPLICATION_JSON)
                .when().put("/courses/{id}", id)
                .then()
                .statusCode(204)
                .body(is(emptyString()));

        given()
                .when().get("/courses/{id}", id)
                .then()
                .statusCode(200)
                .body("title", equalTo("UpdatedQuarkusCourse"));
    }

    @Test
    public void testDeleteCourse() {

        given()
                .when().delete("/courses/1")
                .then()
                .statusCode(204);

    }
}