import { UserType } from "@shared/enums/app-enums";

export interface RegisterUser {
  swiftPassUser: User;
  userType: UserType
}

export interface ConfirmEmail {
  email: string,
  otp: string,
  trackingId: string
}

export interface CompleteRegistrationPayload {
  email: string,
  password: string,
  token: string
}

export interface UserLogin {
  email: string;
  password: string;
}

export class User {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  userType: UserType;
  token?: string;
  hasSetUpSecurityQuestions: boolean;
  hasCompletedProfileSetup: boolean;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.userType = user.userType;
    this.hasSetUpSecurityQuestions = user.hasSetUpSecurityQuestions;
    this.hasCompletedProfileSetup = user.hasCompletedProfileSetup
  }

  get fullName(): string {
    // if (this.middleName) {
    //   return `${this.firstName} ${this.middleName} ${this.lastName}`;
    // }
    return `${this.firstName} ${this.lastName}`;
  }
}
