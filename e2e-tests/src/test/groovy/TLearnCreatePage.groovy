import geb.Page
import groovyx.net.http.RESTClient

class TLearnCreatePage extends Page {

  static at = { waitFor {$("div", text: contains("Veranstaltung erstellen")) } }

  static content = {
    linkToOverviewPage(to: TLearnOverviewPage) {$("a", text: "Übersicht")}
    linkToCreatePage {$("a", text: "Erstellen")}
    titleInputField {$("#title")}
    organizerInputField {$("#trainer")}
    contactPersonInputField {$("#organizer")}
    startDateInputField {$("#start-date")}
    endDateInputField {$("#end-date")}
    courseTypeInputField {$("#course-type")}
    courseTypeExternalOption {$("#course-type > option:nth-child(2)")}
    courseTypeInternalOption {$("#course-type > option:nth-child(3)")}
    courseFormInputField {$("#courseForm")}
    courseFormMeetupOption
    courseFormLanguageCourseOption
    locationInputField {$("#location")}
    locationRemoteOption {$("#location > option:nth-child(2)")}
    locationPresenceOption {$("#location > option:nth-child(3)")}
    priceInputField {$("#price")}
    addressInputField {$("#address")}
    linkInputField {$("#link")}
    categoryInputField {$(".vs__search")}
    targetAudienceInputField {$("#target-audience")}
    descriptionInputField {$("#description")}
    createButton(to: [TLearnDetailsPage, TLearnCreatePage]) {$("button", text: "ERSTELLEN")}
    }
}
