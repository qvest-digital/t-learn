import { dateFormatFilter } from "@/filter/dateformatFilter";

describe("dateformatFilter.js", () => {
  it("formats ISO 8601 date only", () => {
    expect(dateFormatFilter("2020-09-15")).toBe("15.09.2020 00:00");
  });

  it("formats ISO 8601 date+time in UTC offset format", () => {
    expect(dateFormatFilter("2020-09-15T11:59:08+00:00")).toBe(
      "15.09.2020 11:59"
    );
  });

  it("formats ISO 8601 date+time in UTC Z format", () => {
    expect(dateFormatFilter("2020-09-15T11:59:08Z")).toBe("15.09.2020 11:59");
  });

  it("formats ISO 8601 date+time in offset format", () => {
    expect(dateFormatFilter("2020-09-15T11:59:08+02:00")).toBe(
      "15.09.2020 09:59"
    );
  });

  it("formats ISO 8601 date+time in UTC Z format with custom format", () => {
    expect(dateFormatFilter("2020-09-15T11:59:08Z", "dd/MM/yyyy HH.mm")).toBe(
      "15/09/2020 11.59"
    );
  });

  it("handles empty input", () => {
    expect(dateFormatFilter("")).toBe("");
    expect(dateFormatFilter(null)).toBe("");
    expect(dateFormatFilter(undefined)).toBe("");
  });
});
