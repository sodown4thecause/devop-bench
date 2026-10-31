export function currencyForRegion(): string {
  const region = process.env.PINBOARD_REGION;
  return region === "us" ? "USD" : "AUD";
}
