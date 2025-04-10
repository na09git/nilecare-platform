export function generateTrackingNumber(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let trackingNumber = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    trackingNumber += characters[randomIndex];
  }

  return trackingNumber;
}
