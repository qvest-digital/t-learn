import spock.lang.Ignore
import spock.lang.Stepwise

@Stepwise
class GeneralTests extends E2ETestSpec {

    def "headline text is t-learn"(){ //first dummy test
	given: 
	at TLearnOverviewPage

	when:
	linkToCreatePage.click()
	
	then:
    waitFor {
        header.text() == 't-learn'
    }
    }


        def "empty mandatory fields are marked with error message"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        createButton.click()

        then:
        waitFor {
        $("div", text: contains("Titel / Thema ist ein Pflichtfeld.")) && $("div", text: contains("Trainer ist ein Pflichtfeld.")) && $("div", text: contains("Veranstaltungsart ist ein Pflichtfeld."))
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }


	
	def "event is displayed on details page after creation"(){
	given:
	at TLearnOverviewPage

	when:
	linkToCreatePage.click()
	titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
	courseTypeExternalOption.click()
        locationInputField.click()
	locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
	
	then:
	waitFor {
	$("div", text: contains("E2E-Test Title")) && $("div", text: contains("E2E-Test Trainer")) && $("div", text: contains("E2E-Test Organizer")) && $("div", text: contains("11.11.2020 08:00")) && $("div", text: contains("22.11.2020 20:00")) && $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && $("div", text: contains("https://www.tarent.de")) && $("div", text: contains("E2E QA")) && $("div", text: contains("E2E Description")) && $("div", text: contains("Extern")) && $("div", text: contains("Remoteveranstaltung"))
	}

	cleanup:
	Thread.sleep(100)
	//resetDb()
	}
        

	def "created event is displayed on overview page"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        locationInputField.click()
        locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
	linkToOverviewPage.click()

        then:
        waitFor {
        $("div", text: contains("E2E-Test Title")) && $("div", text: contains("Remote")) && $("div", text: contains("E2E QA"))
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }

        def "delete event on overview page after creation"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        locationInputField.click()
        locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
	deleteButton.click()
	deleteConfirmationModalOkButton.click()

        then:
        waitFor {
        $("div", text: notContains("E2E-Test Title")) 
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }

        def "cancel deleting event on overview page after creation"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        locationInputField.click()
        locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
        deleteButton.click()
	deleteConfirmationModalCancelButton.click()

        then:
	waitFor {
        $("div", text: contains("E2E-Test Title")) && $("div", text: contains("E2E-Test Trainer")) && $("div", text: contains("E2E-Test Organizer")) && $("div", text: contains("11.11.2020 08:00")) && $("div", text: contains("22.11.2020 20:00")) && $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && $("div", text: contains("https://www.tarent.de")) && $("div", text: contains("E2E QA")) && $("div", text: contains("E2E Description")) && $("div", text: contains("Extern")) && $("div", text: contains("Remoteveranstaltung"))
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }

        def "edit event after creation"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        locationInputField.click()
        locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
        editButton.click()
        titleInputField.value("E2E-Test TitleEDITED")
        trainerInputField.value("E2E-Test TrainerEDITED")
        organizerInputField.value("E2E-Test OrganizerEDITED")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        addressInputField.value("Rochusstr. 2-4, 53123 BonnEDITED")
        linkInputField.value("https://www.tarentedited.de")
        targetAudienceInputField.value("E2E QAEDITED")
        descriptionInputField.value("E2E DescriptionEDITED")
        cancelButton.click()

        then:
        waitFor {
        $("div", text: contains("E2E-Test TitleEDITED")) && $("div", text: contains("E2E-Test TrainerEDITED")) && $("div", text: contains("E2E-Test OrganizerEDITED")) && $("div", text: contains("11.11.2020 08:00")) && $("div", text: contains("22.11.2020 20:00")) && $("div", text: contains("Rochusstr. 2-4, 53123 BonnEDITED")) && $("div", text: contains("https://www.tarentedited.de")) && $("div", text: contains("E2E QAEDITED")) && $("div", text: contains("E2E DescriptionEDITED")) && $("div", text: contains("Extern")) && $("div", text: contains("Remoteveranstaltung"))
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }



        def "cancel editing event after creation"(){
        given:
        at TLearnOverviewPage

        when:
        linkToCreatePage.click()
        titleInputField.value("E2E-Test Title")
        trainerInputField.value("E2E-Test Trainer")
        organizerInputField.value("E2E-Test Organizer")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        courseTypeInputField.click()
        courseTypeExternalOption.click()
        locationInputField.click()
        locationRemoteOption.click()
        addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
        linkInputField.value("https://www.tarent.de")
        targetAudienceInputField.value("E2E QA")
        descriptionInputField.value("E2E Description")
        createButton.click()
        editButton.click()
	titleInputField.value("E2E-Test TitleEDITED")
        trainerInputField.value("E2E-Test TrainerEDITED")
        organizerInputField.value("E2E-Test OrganizerEDITED")
        startDateInputField.value("11.11.2020 08:00")
        endDateInputField.value("22.11.2020 20:00")
        addressInputField.value("Rochusstr. 2-4, 53123 BonnEDITED")
        linkInputField.value("https://www.tarentedited.de")
        targetAudienceInputField.value("E2E QAEDITED")
        descriptionInputField.value("E2E DescriptionEDITED")
	cancelButton.click()

        then:
        waitFor {
        $("div", text: contains("E2E-Test Title")) && $("div", text: contains("E2E-Test Trainer")) && $("div", text: contains("E2E-Test Organizer")) && $("div", text: contains("11.11.2020 08:00")) && $("div", text: contains("22.11.2020 20:00")) && $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && $("div", text: contains("https://www.tarent.de")) && $("div", text: contains("E2E QA")) && $("div", text: contains("E2E Description")) && $("div", text: contains("Extern")) && $("div", text: contains("Remoteveranstaltung"))
        }

        cleanup:
        Thread.sleep(100)
        //resetDb()
        }



}
