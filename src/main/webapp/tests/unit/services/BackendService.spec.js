import "@testing-library/jest-dom";
import axios from "axios";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse
} from "@/services/BackendService";

jest.mock("axios");

describe("BackendService.js", () => {
  it("requests course data from the server", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: "Title1",
            targetAudience: "targetAudience1"
          },
          {
            id: 2,
            title: "Title2",
            targetAudience: "targetAudience2"
          }
        ]
      })
    );

    const courses = await getCourses();
    expect(axios.get).toHaveBeenCalledWith("courses");
    expect(courses.data).toHaveLength(2);
  });

  it("requests specific course from the server", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: "Title1",
            targetAudience: "targetAudience1"
          }
        ]
      })
    );

    const courses = await getCourse(1);
    expect(axios.get).toHaveBeenCalledWith("courses/1");
    expect(courses.data).toHaveLength(1);
  });

  it("send course data to the server", async () => {
    const course = {
      title: "title",
      trainer: "trainer",
      courseType: "courseType",
      link: "link"
    };

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: course
      })
    );

    const response = await createCourse(course);
    expect(axios.post).toHaveBeenCalledWith("courses", course);
    expect(response.data).toBe(course);
  });

  it("send updated course data to the server", async () => {
    const course = {
      id: 1,
      title: "title",
      trainer: "trainer",
      courseType: "courseType",
      link: "link"
    };

    axios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: course
      })
    );

    const response = await updateCourse(course);
    expect(axios.put).toHaveBeenCalledWith("courses/1", course);
    expect(response.data).toBe(course);
  });
});
