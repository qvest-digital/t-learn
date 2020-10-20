import spock.lang.Ignore
import spock.lang.Stepwise

@Stepwise
class GeneralTests extends E2ETestSpec {

  def "empty mandatory fields are marked with error message"(){
    given:
    at TLearnOverviewPage

    when:
    linkToCreatePage.click()
    createButton.click()

    then:
    waitFor {
    $("div", text: contains("Titel / Thema ist ein Pflichtfeld und die maximale Länge sind 255 Zeichen.")) &&
    $("div", text: contains("Veranstalter*in ist ein Pflichtfeld und die maximale Länge sind 255 Zeichen.")) &&
    $("div", text: contains("Veranstaltungsart ist ein Pflichtfeld und die maximale Länge sind 255 Zeichen."))
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
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QA")
    descriptionInputField.value("E2E Description")
    createButton.click()
        
    then:
    waitFor {
    $("div", text: contains("E2E-Test Title")) &&
    $("div", text: contains("E2E-Test Organizer")) && 
    $("div", text: contains("E2E-Test Contact")) && 
    $("div", text: contains("11.11.2020 08:00")) && 
    $("div", text: contains("22.11.2020 20:00")) && 
    $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && 
    $("div", text: contains("https://www.tarent.de")) && 
    $("div", text: contains("E2E QA")) && 
    $("div", text: contains("E2E Description")) && 
    $("div", text: contains("Extern")) && 
    $("div", text: contains("Remote")) && 
    $("div", text: contains("Meetup")) &&
    $("div", text: contains("666€"))
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
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QA")
    descriptionInputField.value("E2E Description")
    createButton.click()
    linkToOverviewPage.click()

    then:
    waitFor {
    $("div", text: contains("E2E-Test Title")) && 
    $("div", text: contains("Remote")) && 
    $("div", text: contains("11.11.2020 08:00"))
    }

    cleanup:
    Thread.sleep(100)
    //resetDb()
    }

  def "delete event on details page after creation"(){
    given:
    at TLearnOverviewPage

    when:
    linkToCreatePage.click()
    titleInputField.value("E2E-Test Title")
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
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

  def "cancel deleting event on details page after creation"(){
    given:
    at TLearnOverviewPage

    when:
    linkToCreatePage.click()
    titleInputField.value("E2E-Test Title")
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QA")
    descriptionInputField.value("E2E Description")
    createButton.click()
    deleteButton.click()
    deleteConfirmationModalCancelButton.click()

    then:
    waitFor {
    $("div", text: contains("E2E-Test Title")) && 
    $("div", text: contains("E2E-Test Organizer")) && 
    $("div", text: contains("E2E-Test Contact")) && 
    $("div", text: contains("11.11.2020 08:00")) && 
    $("div", text: contains("22.11.2020 20:00")) && 
    $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && 
    $("div", text: contains("https://www.tarent.de")) && 
    $("div", text: contains("E2E QA")) && 
    $("div", text: contains("E2E Description")) && 
    $("div", text: contains("Extern")) && 
    $("div", text: contains("Meetup")) &&
    $("div", text: contains("Remote")) && 
    $("div", text: contains("666€"))
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
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QA")
    descriptionInputField.value("E2E Description")
    createButton.click()
    editButton.click()
    titleInputField.value("E2E-Test TitleEDITED")
    organizerInputField.value("E2E-Test OrganizerEDITED")
    contactPersonInputField.value("E2E-Test ContactEDITED")
    startDateInputField.value("11.11.2021 08:00")
    endDateInputField.value("22.11.2021 20:00")
    courseTypeInputField.click()
    courseTypeInternalOption.click()
    courseFormDropdown.click()
    courseFormBootcampOption.click()
    executionTypeInputField.click()
    executionTypePresenceOption.click()
    priceInputField.value("999€")
    addressInputField.value("Rochusstr. 2-4, 53123 BonnEDITED")
    linkInputField.value("https://www.tarentEDITED.de")
    categoryInputField.click()
    categoryInputField.value("backend")
    targetAudienceInputField.value("E2E QAEDITED")
    descriptionInputField.value("E2E DescriptionEDITED")
    saveButton.click()

    then:
    waitFor {
    $("div", text: contains("E2E-Test TitleEDITED")) && 
    $("div", text: contains("E2E-Test OrganizerEDITED")) && 
    $("div", text: contains("E2E-Test ContactEDITED")) && 
    $("div", text: contains("11.11.2021 08:00")) && 
    $("div", text: contains("22.11.2021 20:00")) && 
    $("div", text: contains("Rochusstr. 2-4, 53123 BonnEDITED")) && 
    $("div", text: contains("https://www.tarentEDITED.de")) && 
    $("div", text: contains("E2E QAEDITED")) && 
    $("div", text: contains("E2E DescriptionEDITED")) && 
    $("div", text: contains("Bootcamp/Konferenz")) &&
    $("div", text: contains("Intern")) && 
    $("div", text: contains("Präsenz")) 
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
    organizerInputField.value("E2E-Test Organizer")
    contactPersonInputField.value("E2E-Test Contact")
    startDateInputField.value("11.11.2020 08:00")
    endDateInputField.value("22.11.2020 20:00")
    courseTypeInputField.click()
    courseTypeExternalOption.click()
    courseFormDropdown.click()
    courseFormMeetupOption.click()
    executionTypeInputField.click()
    executionTypeRemoteOption.click()
    priceInputField.value("666€")
    addressInputField.value("Rochusstr. 2-4, 53123 Bonn")
    linkInputField.value("https://www.tarent.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QA")
    descriptionInputField.value("E2E Description")
    createButton.click()
    editButton.click()
    titleInputField.value("E2E-Test TitleEDITED")
    organizerInputField.value("E2E-Test OrganizerEDITED")
    contactPersonInputField.value("E2E-Test ContactEDITED")
    startDateInputField.value("11.11.2021 08:00")
    endDateInputField.value("22.11.2021 20:00")
    courseTypeInputField.click()
    courseTypeInternalOption.click()
    courseFormDropdown.click()
    courseFormBootcampOption.click()
    executionTypeInputField.click()
    executionTypePresenceOption.click()
    priceInputField.value("999€")
    addressInputField.value("Rochusstr. 2-4, 53123 BonnEDITED")
    linkInputField.value("https://www.tarentEDITED.de")
    categoryInputField.click()
    categoryInputField.value("fontend")
    targetAudienceInputField.value("E2E QAEDITED")
    descriptionInputField.value("E2E DescriptionEDITED")
    cancelButton.click()

    then:
    waitFor {
    $("div", text: contains("E2E-Test Title")) && 
    $("div", text: contains("E2E-Test Organizer")) && 
    $("div", text: contains("E2E-Test Contact")) && 
    $("div", text: contains("11.11.2020 08:00")) && 
    $("div", text: contains("22.11.2020 20:00")) && 
    $("div", text: contains("Rochusstr. 2-4, 53123 Bonn")) && 
    $("div", text: contains("https://www.tarent.de")) && 
    $("div", text: contains("E2E QA")) && 
    $("div", text: contains("E2E Description")) && 
    $("div", text: contains("Extern")) && 
    $("div", text: contains("Meetup")) &&
    $("div", text: contains("Remote")) && 
    $("div", text: contains("666€"))
    }

    cleanup:
    Thread.sleep(100)
    //resetDb()
    }
}
