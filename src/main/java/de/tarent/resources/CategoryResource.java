package de.tarent.resources;

import com.fasterxml.jackson.databind.util.JSONPObject;
import de.tarent.entities.Category;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/categories")
public class CategoryResource {

   @GET
   @Produces(APPLICATION_JSON)
   public Response getAll(){
       List<Category> categories = Category.listAll();
       return Response.status(200).entity(categories.stream().map(Category::getName).collect(Collectors.toList())).build();
   }
}
