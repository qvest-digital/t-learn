package de.tarent.resources;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.HttpHeaders.ACCEPT;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.hamcrest.Matchers.hasItems;

@QuarkusTest
class CategoryResourceTest {

    @Test
    public void testGetAllCategories() {

        given().header(ACCEPT, APPLICATION_JSON)
                .when().get("/categories")
                .then()
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .statusCode(200)
                .body("$", hasItems("great category", "good category"));
    }
}