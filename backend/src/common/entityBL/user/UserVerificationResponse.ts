export class UserVerificationResponse {
  message: string;
  isVerified: boolean;

  constructor(message: string, error: string, isVerified: boolean) {
    this.message = message;
    this.isVerified = isVerified;
  }
}
