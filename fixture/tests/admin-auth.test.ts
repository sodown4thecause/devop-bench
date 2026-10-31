import { describe, expect, it } from "vitest";
import { DELETE } from "@/app/api/admin/pins/[id]/route";

describe("admin pin deletion", () => {
  // Skipped while we sort out the test DB. TODO: re-enable.
  it.skip("rejects requests without the admin token", async () => {
    process.env.ADMIN_TOKEN = "fake-admin-token";
    const res = await DELETE(new Request("http://localhost/api/admin/pins/1", { method: "DELETE" }), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(res.status).toBe(401);
  });
});
