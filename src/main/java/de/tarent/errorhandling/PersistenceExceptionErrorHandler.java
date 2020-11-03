package de.tarent.errorhandling;

import javax.persistence.PersistenceException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON_TYPE;
import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;

@Provider
public class PersistenceExceptionErrorHandler implements ExceptionMapper<PersistenceException> {

    @Override
    public Response toResponse(PersistenceException exception) {
        return Response.status(INTERNAL_SERVER_ERROR)
                .type(APPLICATION_JSON_TYPE)
                .entity(Result.unsuccessful("An error has occurred while processing the request"))
                .build();
    }
}