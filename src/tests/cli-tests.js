import { execSync } from "child_process";
import assert from "assert";

describe("PostCLI Commands", function () {
  it("Should execute a GET request successfully", function () {
    const output = execSync("node ./src/index.js request GET https://jsonplaceholder.typicode.com/posts/1").toString();
    assert.ok(output.includes("POSTCLI RESPONSE"));
  });

  it("Should save response correctly", function () {
    execSync("node ./src/index.js response save 0 testResponse");
    const fs = require("fs");
    assert.ok(fs.existsSync("./src/responses/testResponse.json"));
  });
});
