package de.tarent.resources;

import de.tarent.entities.Category;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/categories")
public class CategoryResource {

    @GET
    @Produces(APPLICATION_JSON)
    public Response getAll() {
        List<Category> categories = Category.listAll();
        return Response.ok(categories.stream().map(category -> category.name).collect(toList())).build();
    }
}
