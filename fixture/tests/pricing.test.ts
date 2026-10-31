import { describe, expect, it } from "vitest";
import { priceForCycle } from "@/lib/pricing";

describe("pricing", () => {
  it("charges the monthly list price for monthly billing", () => {
    expect(priceForCycle("pro", "monthly")).toBe(1900);
  });

  it("annual billing is 2 months free (12 months for the price of 10)", () => {
    expect(priceForCycle("pro", "annual")).toBe(19000);
    expect(priceForCycle("team", "annual")).toBe(49000);
  });

  it("free stays free", () => {
    expect(priceForCycle("free", "annual")).toBe(0);
  });
});
