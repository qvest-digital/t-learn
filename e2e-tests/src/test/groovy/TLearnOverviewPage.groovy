import geb.Page

class TLearnOverviewPage extends Page {

    static at = { waitFor {$("div", text: contains("Übersicht über alle Veranstaltungen")) } } 

    static content = {
	header {$("a", text: "t-learn")}
	linkToOverviewPage {$("a", text: "Übersicht")}
        linkToCreatePage(to: TLearnCreatePage) {$("a", text: "Anlegen")}
        linkToPrivacyPage {$("a", text: "Privacy Policy")}
        linkToImpressumPage {$("a", text: "Impressum")}
    }

}
