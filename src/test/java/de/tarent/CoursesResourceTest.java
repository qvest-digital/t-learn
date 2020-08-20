package de.tarent;

import de.tarent.entities.Course;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.net.MalformedURLException;
import java.net.URL;

import static de.tarent.entities.Course.CourseType.EXTERNAL;
import static de.tarent.entities.Course.Location.REMOTE;
import static io.restassured.RestAssured.given;
import static java.time.LocalDateTime.parse;
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
                .body("trainer", containsInAnyOrder("Tim Trainer", "Theo Trainer"))
                .body("organizer", containsInAnyOrder("Otto Organizer", "Oskar Organizer"))
                .body("startDate", containsInAnyOrder("2020-01-01T20:00:00", "2020-01-02T20:00:00"))
                .body("endDate", containsInAnyOrder("2020-01-01T21:00:00", "2020-01-02T21:00:00"))
                .body("courseType", containsInAnyOrder("EXTERNAL", "INTERNAL"))
                .body("location", containsInAnyOrder("REMOTE", "ONSITE"))
                .body("address", containsInAnyOrder("Rochusstraße 2-4, 53123 Bonn", "Dickobskreuz, 53123 Bonn"))
                .body("targetAudience", containsInAnyOrder("alle", "devs"))
                .body("link", containsInAnyOrder("http://tarent.de", "http://tarent.de"));

    }

    @Test
    public void testCreateNewCourse() throws MalformedURLException {

        final Course course = new Course();
        course.title = "CreatedQuarkusCourse";
        course.trainer = "Norbert Neutrainer";
        course.organizer = "Oskar Neuorganizer";
        course.startDate = parse("2020-01-03T21:00:00");
        course.endDate = parse("2020-01-03T22:00:00");
        course.courseType = EXTERNAL;
        course.location = REMOTE;
        course.address = "Rochusstraße 2-4, 53123 Bonn";
        course.targetAudience = "Alle";
        course.link = new URL("http://tarent.de");

        final Integer id = given().body(course).header("Content-Type", APPLICATION_JSON)
                .when().post("/courses")
                .then()
                .statusCode(201)
                .body("title", equalTo("CreatedQuarkusCourse"))
                .body("trainer", equalTo("Norbert Neutrainer"))
                .body("organizer", equalTo("Oskar Neuorganizer"))
                .body("startDate", equalTo("2020-01-03T21:00:00"))
                .body("endDate", equalTo("2020-01-03T22:00:00"))
                .body("courseType", equalTo("EXTERNAL"))
                .body("location", equalTo("REMOTE"))
                .body("address", equalTo("Rochusstraße 2-4, 53123 Bonn"))
                .body("targetAudience", equalTo("Alle"))
                .body("link", equalTo("http://tarent.de"))
                .extract().path("id");

        given().header("Accept", APPLICATION_JSON)
                .when().get("/courses/{id}", id)
                .then()
                .statusCode(200)
                .body("title", equalTo("CreatedQuarkusCourse"));
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

        given().header("Accept", APPLICATION_JSON)
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