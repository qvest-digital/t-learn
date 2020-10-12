import geb.Page
import groovyx.net.http.RESTClient

class TLearnEditPage extends Page {

  static at = { waitFor {$("div", text: contains("Editieren einer Veranstaltung")) } }

  static content = {
    linkToOverviewPage {$("div.nav-link:nth-child(2) > img:nth-child(1)")}
    linkToCreatePage {$("a", text: "Erstellen")}
    titleInputField {$("#title")}
    organizerInputField {$("#trainer")}
    contactPersonInputField {$("#organizer")}
    startDateInputField {$("#start-date")}
    endDateInputField {$("#end-date")}
    courseTypeInputField {$("#course-type")}
    courseTypeExternalOption {$("#course-type > option:nth-child(2)")}
    courseTypeInternalOption {$("#course-type > option:nth-child(3)")}
    locationInputField {$("#location")}
    locationRemoteOption {$("#location > option:nth-child(2)")}
    locationPresenceOption {$("#location > option:nth-child(3)")}
    priceInputField {$("#price")}
    addressInputField {$("#address")}
    linkInputField {$("#link")}
    categoryInputField {$(".vs__search")}
    targetAudienceInputField {$("#target-audience")}
    descriptionInputField {$("#description")}
    saveButton(to: [TLearnDetailsPage, TLearnCreatePage]) {$("button", text: "SPEICHERN")}
    cancelButton(to: TLearnDetailsPage) {$("button", text: "ABBRECHEN")}
    }
}
