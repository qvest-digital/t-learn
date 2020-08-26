package de.tarent.errorhandling;


import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.Set;
import java.util.stream.Collectors;

@Provider
public class ErrorMapper implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception exception) {
        Throwable cause = exception.getCause();

        while (cause != null && !(cause instanceof ConstraintViolationException)) {
            cause = cause.getCause();
        }

        if (cause != null) {
            return Response.status(400)
                    .entity(new Result(((ConstraintViolationException) cause).getConstraintViolations()))
                    .build();
        }

        return Response.status(500)
                .entity(exception.getMessage())
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
