package de.tarent.errorhandling;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.Set;
import java.util.stream.Collectors;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException constraintViolationException) {
        return Response.status(BAD_REQUEST)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(new Result(constraintViolationException.getConstraintViolations()))
                .build();
    }

    private static class Result {

        private String message;
        private boolean success;

        Result(Set<? extends ConstraintViolation<?>> violations) {
            this.success = false;
            this.message = violations.stream()
                    .map(violation -> String.join(" ", violation.getPropertyPath().toString(), violation.getMessage()))
                    .map(String::strip)
                    .collect(Collectors.joining(", "));
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

    }
}
