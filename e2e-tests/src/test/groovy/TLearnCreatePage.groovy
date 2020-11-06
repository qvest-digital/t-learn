import geb.Page

class TLearnCreatePage extends Page {

    static at = { waitFor { $('div', text: contains('Veranstaltung erstellen')) } }

    static content = {
        linkToOverviewPage(to: TLearnOverviewPage) { $('a', text: 'Übersicht') }
        linkToCreatePage { $('a', text: 'Erstellen') }
        titleInputField { $('#title') }
        organizerInputField { $('#organizer') }
        contactPersonInputField { $('#contactPerson') }
        startDateInputField { $('#start-date') }
        endDateInputField { $('#end-date') }
        courseTypeInputField { $('#course-type') }
        courseTypeExternalOption { $('#course-type > option:nth-child(2)') }
        courseTypeInternalOption { $('#course-type > option:nth-child(3)') }
        courseFormDropdown { $('#courseForm') }
        courseFormMeetupOption { $('#courseForm > option:nth-child(2)') }
        courseFormBootcampOption { $('#courseForm > option:nth-child(3)') }
        executionTypeInputField { $('#executionType') }
        executionTypeRemoteOption { $('#executionType > option:nth-child(2)') }
        executionTypePresenceOption { $('#executionType > option:nth-child(3)') }
        priceInputField { $('#price') }
        addressInputField { $('#address') }
        linkInputField { $('#link') }
        categoryInputField { $('.vs__search') }
        targetAudienceInputField { $('#target-audience') }
        descriptionInputField { $('#description') }
        createButton(to: [TLearnDetailsPage, TLearnCreatePage]) { $('button', text: 'ERSTELLEN') }
        }

    void createCourse() {
        titleInputField.value('E2E-Test Title')
        organizerInputField.value('E2E-Test Organizer')
        contactPersonInputField.value('E2E-Test Contact')
        startDateInputField.value('11.11.2020 08:00')
        endDateInputField.value('22.11.2020 20:00')
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        courseFormDropdown.click()
        courseFormMeetupOption.click()
        executionTypeInputField.click()
        executionTypeRemoteOption.click()
        priceInputField.value('666€')
        addressInputField.value('Rochusstr. 2-4, 53123 Bonn')
        linkInputField.value('https://www.tarent.de')
        categoryInputField.click()
        categoryInputField.value('fontend')
        targetAudienceInputField.value('E2E QA')
        descriptionInputField.value('E2E Description')
        createButton.click()
    }
}
