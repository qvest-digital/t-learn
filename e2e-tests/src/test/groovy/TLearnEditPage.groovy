import geb.Page
import groovyx.net.http.RESTClient

class TLearnEditPage extends Page {

    static at = { waitFor {$("div", text: contains("Editieren einer Veranstaltung")) } }

    static content = {
	header(to: TLearnOverviewPage) {$("a", text: "t-learn")}
	linkToOverviewPage(to: TLearnOverviewPage) {$("a", text: "Übersicht")}
	linkToCreatePage {$("a", text: "Anlegen")}
	linkToPrivacyPage {$("a", text: "Privacy Policy")}
	linkToImpressumPage {$("a", text: "Impressum")}
	titleInputField {$("#title")}
	trainerInputField {$("#trainer")}
	organizerInputField {$("#organizer")}
	startDateInputField {$("#startDate")}
	endDateInputField {$("#endDate")}
	courseTypeInputField {$("#courseType")}
	courseTypeExternalOption {$("#courseType > option:nth-child(2)")}
	courseTypeInternalOption {$("#courseType > option:nth-child(3)")}
	locationInputField {$("#location")}
	locationRemoteOption {$("#location > option:nth-child(2)")}
	locationPresenceOption {$("#location > option:nth-child(3)")}
	addressInputField {$("#address")}
	linkInputField {$("#link")}
	targetAudienceInputField {$("#targetAudience")}
	descriptionInputField {$("#description")}
	createButton(to: [TLearnDetailsPage, TLearnCreatePage]) {$("button", text: "Speichern")}
	cancelButton(to: TLearnDetailsPage) {$("button", text: "Abbrechen")}
    }

}
