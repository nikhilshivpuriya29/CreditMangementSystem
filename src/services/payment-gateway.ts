/**
 * Generates a payment link for a specific customer and amount.
 *
 * @param customerId The ID of the customer.
 * @param amount The amount for which to generate the payment link.
 * @param description A description of the payment.
 * @returns A promise that resolves to a payment link.
 */
export async function generatePaymentLink(
  customerId: string,
  amount: number,
  description: string
): Promise<string> {
  // TODO: Implement this by calling the Payment Gateway API.
  console.log(
    `Generating payment link for customer ${customerId}, amount ${amount}, description: ${description}`
  );
  return 'https://example.com/payment-link';
}
