export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function requireAdmin(request: Request): void {
  const header = request.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    throw new HttpError(401, "admin token required");
  }
}
