/**
 * Sends an SMS message to the specified phone number.
 *
 * @param phoneNumber The recipient's phone number.
 * @param message The text message to send.
 * @returns A promise that resolves when the SMS is successfully sent.  May return some sort of message id or status.
 */
export async function sendSms(phoneNumber: string, message: string): Promise<string> {
  // TODO: Implement this by calling an SMS API.
  console.log(`Sending SMS to ${phoneNumber}: ${message}`);
  return 'SMS sent successfully.';
}
