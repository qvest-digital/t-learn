import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/vue";
import CourseCreationForm from "@/components/CourseCreationForm.vue";
import { createCourse } from "@/services/BackendService";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import routes from "@/routes";

jest.mock("@/services/BackendService");
global.console = { error: jest.fn() };

describe("CourseCreationForm.vue", () => {
  afterEach(() => {
    createCourse.mockReset();
  });

  it("sends form data on submit to server and navigates to overview", async () => {
    createCourse.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    let routerPushSpy;
    const { getByTestId, getByRole } = render(
      CourseCreationForm,
      {
        routes: routes
      },
      (localVue, store, router) => {
        localVue.use(BootstrapVue);
        localVue.use(Vuelidate);
        router.push("/create");
        routerPushSpy = jest.spyOn(router, "push");
      }
    );

    expect(getByTestId("errorMsg")).not.toBeVisible();

    // set required fields
    await fireEvent.update(
      getByRole("textbox", { name: "Titel / Thema" }),
      "Test"
    );
    await fireEvent.update(
      getByRole("textbox", { name: "Trainer" }),
      "Trainer"
    );
    await fireEvent.update(
      getByRole("combobox", { name: "Veranstaltungsart" }),
      "EXTERNAL"
    );

    await fireEvent.submit(getByRole("button"));

    expect(getByTestId("errorMsg")).not.toBeVisible();
    expect(createCourse).toHaveBeenCalledWith({
      address: null,
      courseType: "EXTERNAL",
      endDate: null,
      link: null,
      location: null,
      organizer: null,
      startDate: null,
      targetAudience: null,
      title: "Test",
      trainer: "Trainer"
    });
    expect(routerPushSpy).toHaveBeenCalledWith("/");
  });

  it("shows error message on unsuccessful form data submit to server", async () => {
    createCourse.mockImplementationOnce(() =>
      Promise.reject({
        data: {}
      })
    );

    const { getByRole, getByTestId } = setupComponent();

    const errorMessages = getByTestId("errorMsg");
    expect(errorMessages).not.toBeVisible();

    // set required fields
    await fireEvent.update(
      getByRole("textbox", { name: "Titel / Thema" }),
      "Test"
    );
    await fireEvent.update(
      getByRole("textbox", { name: "Trainer" }),
      "Trainer"
    );
    await fireEvent.update(
      getByRole("combobox", { name: "Veranstaltungsart" }),
      "EXTERNAL"
    );

    await fireEvent.submit(getByRole("button"));

    expect(createCourse).toHaveBeenCalledWith({
      address: null,
      courseType: "EXTERNAL",
      endDate: null,
      link: null,
      location: null,
      organizer: null,
      startDate: null,
      targetAudience: null,
      title: "Test",
      trainer: "Trainer"
    });
    await waitFor(() => expect(errorMessages).toBeVisible());
  });

  it("shows validation errors when required fields are not filled", async () => {
    const { getByRole, getByTestId } = setupComponent();

    expect(getByTestId("errorMsg")).not.toBeVisible();

    await fireEvent.submit(getByRole("button"));

    expect(createCourse).not.toBeCalled();

    expect(getByTestId("errorMsg")).not.toBeVisible();
    expect(getByRole("textbox", { name: "Titel / Thema" }).classList).toContain(
      "is-invalid"
    );
    expect(getByRole("textbox", { name: "Trainer" }).classList).toContain(
      "is-invalid"
    );
    expect(
      getByRole("combobox", { name: "Veranstaltungsart" }).classList
    ).toContain("is-invalid");
  });

  it("shows no validation errors when start date and end date is valid", async () => {
    const { getByRole } = setupComponent();

    const startInput = getByRole("textbox", { name: "Start" });
    const endInput = getByRole("textbox", { name: "Ende" });
    await fireEvent.update(startInput, "12.12.2020 12:12");
    await fireEvent.update(endInput, "12.12.2020 12:13");

    expect(startInput.classList).toContain("is-valid");
    expect(endInput.classList).toContain("is-valid");
  });

  it("shows validation errors when start and end date are not in valid format", async () => {
    const { getByRole } = setupComponent();

    const startInput = getByRole("textbox", { name: "Start" });
    const endInput = getByRole("textbox", { name: "Ende" });
    await fireEvent.update(startInput, "2020-12-12");
    await fireEvent.update(endInput, "2020-12-12");

    expect(startInput.classList).toContain("is-invalid");
    expect(endInput.classList).toContain("is-invalid");
  });

  it("shows validation errors when start date is after end date", async () => {
    const { getByRole } = setupComponent();

    const startInput = getByRole("textbox", { name: "Start" });
    const endInput = getByRole("textbox", { name: "Ende" });
    await fireEvent.update(startInput, "12.12.2020 12:12");
    await fireEvent.update(endInput, "12.12.2020 12:11");

    expect(startInput.classList).toContain("is-invalid");
    expect(endInput.classList).toContain("is-invalid");
  });

  it("shows validation errors when start date is equal to end date", async () => {
    const { getByRole } = setupComponent();

    const startInput = getByRole("textbox", { name: "Start" });
    const endInput = getByRole("textbox", { name: "Ende" });
    await fireEvent.update(startInput, "12.12.2020 12:12");
    await fireEvent.update(endInput, "12.12.2020 12:12");

    expect(startInput.classList).toContain("is-invalid");
    expect(endInput.classList).toContain("is-invalid");
  });

  it("it does not show validation error when link is valid", async () => {
    const { getByRole } = setupComponent();

    const linkInput = getByRole("textbox", { name: "Weiterführender Link" });
    await fireEvent.update(linkInput, "https://tarent.de");

    expect(linkInput.classList).toContain("is-valid");
  });

  it("shows validation error when link is invalid", async () => {
    const { getByRole } = setupComponent();

    const linkInput = getByRole("textbox", { name: "Weiterführender Link" });
    await fireEvent.update(linkInput, "localhost");

    expect(linkInput.classList).toContain("is-invalid");
  });

  it("shows validation error when link protocol is not http or https", async () => {
    const { getByRole } = setupComponent();

    const linkInput = getByRole("textbox", { name: "Weiterführender Link" });
    await fireEvent.update(linkInput, "ftp://tarent.de");

    expect(linkInput.classList).toContain("is-invalid");
  });

  function setupComponent() {
    return render(CourseCreationForm, {}, localVue => {
      localVue.use(BootstrapVue);
      localVue.use(Vuelidate);
    });
  }
});
