import { describe, expect, it } from "vitest";

import { camel, pascal } from "./utils";

describe("camel", () => {
  it("converts a string to camel case", () => {
    expect(camel("the_quick_brown_fox")).toBe("theQuickBrownFox");
  });

  it("handles strings with no letters", () => {
    expect(camel("123_456_789")).toBe("123456789");
  });

  it("converts a string with spaces to camel case", () => {
    expect(camel("Linked record token")).toBe("linkedRecordToken");
  });

  it("handles single-word strings", () => {
    expect(camel("component")).toBe("component");
    expect(camel("COMPONENT")).toBe("component");
    expect(camel("Component")).toBe("component");
  });

  it("handles empty strings", () => {
    expect(camel("")).toBe("");
  });
});

describe("pascal", () => {
  it("converts a string to pascal case", () => {
    expect(pascal("the_quick_brown_fox")).toBe("TheQuickBrownFox");
  });

  it("handles strings with no letters", () => {
    expect(pascal("123_456_789")).toBe("123456789");
  });

  it("converts a string with spaces to pascal case", () => {
    expect(pascal("Linked record token")).toBe("LinkedRecordToken");
  });

  it("handles single-word strings", () => {
    expect(pascal("component")).toBe("Component");
    expect(pascal("COMPONENT")).toBe("Component");
    expect(pascal("Component")).toBe("Component");
  });

  it("handles empty strings", () => {
    expect(pascal("")).toBe("");
  });
});
