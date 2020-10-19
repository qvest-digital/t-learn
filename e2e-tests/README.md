# End To End (e2e) tests for t-learn

## Description

This is a suite of tests running browser-based tests against a t-learn installation. It is based on Geb and uses the Chrome and Firefox
browser to test conformity.

## Usage

The following commands will launch the tests with the individual browsers:

    ./gradlew chromeTest
    ./gradlew firefoxTest

To run the test in headless mode (default for automated tests):

    ./gradlew chromeHeadlessTest
    ./gradlew firefoxHeadlessTest

Replace `./gradlew` with `gradlew.bat` in the above examples if you're on Windows.

