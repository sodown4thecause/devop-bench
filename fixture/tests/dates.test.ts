import { describe, expect, it } from "vitest";
import { pinDay } from "@/lib/dates";

describe("pinDay", () => {
  it("shows the UTC calendar day a pin was posted", () => {
    expect(pinDay("2026-10-31T23:30:00Z")).toBe("2026-10-31");
  });
});
