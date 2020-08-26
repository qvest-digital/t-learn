package de.tarent.validator;

import de.tarent.entities.Course;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static java.time.temporal.ChronoUnit.HOURS;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class StartDateBeforeEndDateValidatorTest {

    private StartDateBeforeEndDateValidator underTest;
    private final LocalDateTime now = LocalDateTime.now();

    @BeforeEach
    void setUp() {
        underTest = new StartDateBeforeEndDateValidator();
    }

    @Test
    void testNull() {

        assertTrue(underTest.isValid(null, null));
    }

    @Test
    void testEmptyCourse() {
        final Course course = new Course();

        assertTrue(underTest.isValid(course, null));
    }

    @Test
    void testStartDateSet() {

        final Course course = new Course();
        course.startDate = now;

        assertTrue(underTest.isValid(course, null));
    }

    @Test
    void testEndDateSet() {

        final Course course = new Course();
        course.endDate = now;

        assertTrue(underTest.isValid(course, null));
    }

    @Test
    void testEndDateAfterStartDate() {

        final Course course = new Course();
        course.startDate = now;
        course.endDate = now.plus(1, HOURS);

        assertTrue(underTest.isValid(course, null));
    }

    @Test
    void testStartDateEqualsEndDate() {

        final Course course = new Course();
        course.startDate = now;
        course.endDate = now;

        assertFalse(underTest.isValid(course, null));
    }

    @Test
    void testStartDateAfterEndDate() {

        final Course course = new Course();
        course.startDate = now.plus(1, HOURS);
        course.endDate = now;

        assertFalse(underTest.isValid(course, null));
    }
}