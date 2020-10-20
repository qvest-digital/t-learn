package de.tarent.resources;

import de.tarent.entities.Category;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import javax.transaction.Transactional;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.hamcrest.Matchers.*;

@QuarkusTest
class CategoryResourceTest {

    public static final String CONTENT_TYPE = "Content-Type";

    @Test
    @Transactional
    public void testGetAllCategories() {

//        Category category = new Category();
//        category.setName("great category");
//        category.persistAndFlush();

        given().header("Accept", APPLICATION_JSON)
                .when().get("/categories")
                .then()
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .statusCode(200)
                .body( "$", hasItems("great category", "good category"));
    }
}