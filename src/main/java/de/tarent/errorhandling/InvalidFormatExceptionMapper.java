package de.tarent.errorhandling;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class InvalidFormatExceptionMapper implements ExceptionMapper<InvalidFormatException> {

    @Override
    public Response toResponse(InvalidFormatException invalidFormatException) {
        return Response.status(BAD_REQUEST)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .entity(new Result(invalidFormatException))
                .build();
    }

    private static class Result {

        private final String message;
        private final boolean success;

        Result(InvalidFormatException violations) {
            this.success = false;
            this.message = violations.getOriginalMessage();
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

    }
}
