import geb.Page

class TLearnDetailsPage extends Page {

    static at = { waitFor { $('div', text: contains('BEARBEITEN')) } }

    static content = {
        linkToOverviewPage { $('div.nav-link:nth-child(2) > img:nth-child(1)') }
        linkToCreatePage(to: TLearnCreatePage) { $('a', text: 'Erstellen') }
        editButton(to: TLearnEditPage) { $('button', text: 'BEARBEITEN') }
        deleteButton { $('button', text: 'LÖSCHEN') }
        deleteConfirmationModalCancelButton { $('.secondary') }
        deleteConfirmationModalOkButton(to: TLearnOverviewPage) { $('.primary') }
        }

}
