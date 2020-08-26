package de.tarent.validator;

import de.tarent.entities.Course;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StartDateBeforeEndDateValidator implements ConstraintValidator<StartDateBeforeEndDate, Course> {

    @Override
    public boolean isValid(Course course, ConstraintValidatorContext constraintValidatorContext) {
        return course == null || course.startDate == null || course.endDate == null || course.startDate.isBefore(course.endDate);
    }
}