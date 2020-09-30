import geb.Page

class TLearnDetailsPage extends Page {

    static at = { waitFor {$("div", text: contains("Bearbeiten")) } } 

    static content = {
	header {$("a", text: "t-learn")}
	linkToOverviewPage {$("a", text: "Übersicht")}
        linkToCreatePage(to: TLearnCreatePage) {$("a", text: "Anlegen")}
	editButton(to: TLearnEditPage) {$("button", text: "Bearbeiten")}
	deleteButton {$("button", text: "Löschen")}
	deleteConfirmationModalCancelButton {$("button", text: "Abbrechen")}
	deleteConfirmationModalOkButton(to: TLearnOverviewPage) {$("button", text: "Ok")}
        linkToPrivacyPage {$("a", text: "Privacy Policy")}
        linkToImpressumPage {$("a", text: "Impressum")}
    }

}
