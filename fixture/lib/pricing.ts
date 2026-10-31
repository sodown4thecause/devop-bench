export type Plan = "free" | "pro" | "team";
export type BillingCycle = "monthly" | "annual";

/** Monthly list prices in cents (AUD). */
export const MONTHLY_PRICE_CENTS: Record<Plan, number> = {
  free: 0,
  pro: 1900,
  team: 4900,
};

/** Annual billing is advertised on the pricing page as "2 months free" (12 months for the price of 10). */
export const ANNUAL_DISCOUNT = 0.2;

export function priceForCycle(plan: Plan, cycle: BillingCycle): number {
  const monthly = MONTHLY_PRICE_CENTS[plan];
  if (cycle === "monthly") return monthly;
  const annual = monthly * 12 * (1 - ANNUAL_DISCOUNT);
  return Math.round(annual);
}

export function formatAud(cents: number): string {
  return `A$${(cents / 100).toFixed(2)}`;
}
