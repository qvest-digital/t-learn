import geb.Page

class TLearnEditPage extends Page {

    static at = { waitFor { $('div', text: contains('Editieren einer Veranstaltung')) } }

    static content = {
        linkToOverviewPage { $('div.nav-link:nth-child(2) > img:nth-child(1)') }
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
        saveButton(to: [TLearnDetailsPage, TLearnCreatePage]) { $('button', text: 'SPEICHERN') }
        cancelButton(to: TLearnDetailsPage) { $('button', text: 'ABBRECHEN') }
        }

}
