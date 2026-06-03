import * as z from "zod";
import type { SecurityQuestionItem } from "@/types";

export const titleOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Ms", label: "Ms" },
  { value: "Miss", label: "Miss" },
  { value: "Dr", label: "Dr" },
  { value: "Prof", label: "Prof" },
];

export const steps = ["Personal Details", "Address", "Other Info", "Terms & Condition"];

export const stepFields = [
  ["consent", "title", "firstName", "surname", "countryCode", "mobileNumber", "email", "dateOfBirth"],
  ["addressLine1", "city", "state", "postalCode", "country"],
  ["password", "confirmPassword", "securityQuestion1", "securityAnswer1", "securityQuestion2", "securityAnswer2", "kycDocument", "kycDocumentNumber", "referralCode"],
  ["tsCsAccepted"],
];

export const signupSchema = z.object({
  consent: z.boolean().refine((v) => v, { message: "Consent required" }),
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  middleNames: z.string().max(50, "Middle names too long").optional(),
  surname: z.string().min(1, "Surname is required").max(50, "Surname too long"),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  mobileNumberOTP: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  addressLine1: z.string().min(1, "Address line 1 is required").max(100, "Address too long"),
  addressLine2: z.string().max(50, "Address line 2 too long").optional(),
  city: z.string().min(1, "City is required").max(50, "City name too long"),
  state: z.string().min(1, "State/Province is required").max(50, "State name too long"),
  postalCode: z.string().min(1, "Postal code is required").max(20, "Postal code too long"),
  country: z.string().min(1, "Country is required"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  securityQuestion1: z.string().min(1, "Security question is required"),
  securityAnswer1: z.string().min(1, "Answer is required").max(100, "Answer too long"),
  securityQuestion2: z.string().min(1, "Security question is required"),
  securityAnswer2: z.string().min(1, "Answer is required").max(100, "Answer too long"),
  kycDocument: z.string().min(1, "KYC document type is required"),
  kycDocumentNumber: z.string().min(5, "Document number must be at least 5 characters").max(50, "Document number too long"),
  referralCode: z.string().max(20, "Referral code too long").optional(),
  tsCsAccepted: z.boolean().refine((v) => v, { message: "You must agree to the terms" }),
}).refine((data) => {
  // Only validate password match if password is being set (on step 3+ when fields are visible)
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  // Only require password when fields are visible (step 3) - check by seeing if we're in final submit context
  if (data.password && data.password.length < 4) {
    return false;
  }
  return true;
}, {
  message: "Password must be at least 4 characters",
  path: ["password"],
}).refine((data) => {
  // Check if confirm password is provided when password is set
  if (data.password && !data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Please confirm your password",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export type SecurityQuestionsCache = {
  group100: SecurityQuestionItem[];
  group200: SecurityQuestionItem[];
};
