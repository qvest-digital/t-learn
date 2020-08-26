package de.tarent.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(TYPE)
@Retention(RUNTIME)
@Constraint(validatedBy = StartDateBeforeEndDateValidator.class)
public @interface StartDateBeforeEndDate {

    String message() default "{de.tarent.validator.StartDateBeforeEndDate.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}