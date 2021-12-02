const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
    it("", (done) => {
        request(app).get("/test").expect("all good", done);
    })
});
