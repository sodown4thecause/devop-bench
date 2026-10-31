import { describe, expect, it } from "vitest";
import { currencyForRegion } from "@/lib/region";

describe("currencyForRegion", () => {
  it("defaults to AUD", () => {
    expect(currencyForRegion()).toBe("AUD");
  });
});
