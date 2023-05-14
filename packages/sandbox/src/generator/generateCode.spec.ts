import { describe, expect, it } from "vitest";

import {
  generateCode,
  serializeProperties,
  valuesAreNumbers,
} from "./generateCode";
import { componentSetNodes } from "./nodes.json";

const variantProperties = { Glyph: "android", Size: "default" };

describe("generateCode", () => {
  const areNotNumbers = ["001", "1f", "orly?"];
  it.each(areNotNumbers)("valuesAreNumbers %s", (s) => {
    expect(valuesAreNumbers([s])).toBeFalsy();
  });
  const areNumbers = ["0", "1"];
  it.each(areNumbers)("valuesAreNumbers %s", (s) => {
    expect(valuesAreNumbers([s])).toBeTruthy();
  });
  it("serializeProperties", () => {
    const [key, value] = Object.entries(variantProperties ?? {})[0];
    expect(serializeProperties(variantProperties)).toContain(
      String(key).toLowerCase()
    );
    expect(serializeProperties(variantProperties)).toContain(
      String(value).toLowerCase()
    );
  });
  it("createReactTs", () => {
    const fileContent = generateCode({
      node: componentSetNodes[0] as unknown as ComponentSetNode,
    });
    console.log(fileContent);
    expect(fileContent).toBeTruthy();
  });
});
