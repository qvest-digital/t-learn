import geb.Page

class TLearnOverviewPage extends Page {

    static at = { waitFor { $('div', text: contains('Übersicht aller Verstanstaltungen')) } }

    static content = {
        linkToOverviewPage { $('a', text: 'Übersicht') }
        linkToCreatePage(to: TLearnCreatePage) { $('body > div > div.header-container > div > div:nth-child(3)') }
        }

}
