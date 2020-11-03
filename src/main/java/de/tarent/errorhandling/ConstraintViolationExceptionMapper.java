package de.tarent.errorhandling;

import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.stream.Collectors;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException constraintViolationException) {
        final String message = constraintViolationException.getConstraintViolations().stream()
                .map(violation -> String.join(" ", violation.getPropertyPath().toString(), violation.getMessage()))
                .map(String::strip)
                .collect(Collectors.joining(", "));

        return Response.status(BAD_REQUEST)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(Result.unsuccessful(message))
                .build();
    }
}