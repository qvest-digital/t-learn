package de.tarent.errorhandling;

class Result {

    private String message;
    private boolean success;

    private Result(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }

    static Result successful(String message) {
        return new Result(true, message);
    }

    static Result unsuccessful(String message) {
        return new Result(false, message);
    }
}