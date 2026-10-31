import { describe, expect, it } from "vitest";
import { debounce } from "@/lib/debounce";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("debounce", () => {
  it("fires once after the wait", async () => {
    let calls = 0;
    const fn = debounce(() => calls++, 40);
    const waited = sleep(44);
    // Setup work whose duration varies by machine (stands in for a slow CI runner).
    const spin = Date.now() + Math.floor(Math.random() * 9);
    while (Date.now() < spin) {
      /* spin */
    }
    fn();
    fn();
    await waited;
    expect(calls).toBe(1);
  });
});
