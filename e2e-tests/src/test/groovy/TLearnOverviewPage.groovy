import geb.Page

class TLearnOverviewPage extends Page {

    static at = { waitFor { $('div', text: contains('Übersicht aller Verstanstaltungen')) } }

    static content = {
        linkToCreatePage(to: TLearnCreatePage) { $('body > div > div.header-container > div > div:nth-child(3)') }
        firstEvent(to: TLearnDetailsPage) { $('.course-img') }
        firstEventDeleteButton(required: false) { $('div.icon-container:nth-child(2) > img:nth-child(1)') }
        firstEventEditButton(required: false, to:TLearnEditPage) { $('div.icon-container:nth-child(3) > img:nth-child(1)') }
        deleteEventConfirmationModalDeleteButton(required: false) { $('body > div > div.app-container > div > div.confirm-modal-overlay > div > div.confirm-modal-footer > button.button.primary') }
        deleteEventConfirmationModalCancelButton(required: false) { $('body > div > div.app-container > div > div.confirm-modal-overlay > div > div.confirm-modal-footer > button.button.secondary') }
        }

}
