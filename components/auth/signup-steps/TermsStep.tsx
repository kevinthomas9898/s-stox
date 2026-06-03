"use client";

import type { Control, FieldErrors } from "react-hook-form";
import type { SignupFormData } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsStepProps {
  control: Control<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
}

export function TermsStep({ control, errors }: TermsStepProps) {
  const termsList = [
    "Confirm my understanding that SmartStox is software provider, and not an investment product.",
    "Confirm that SmartStox does not provide financial advice.",
    "I hereby accept that my funds will remain with a licensed broker and that SmartStox does not control my funds.",
    "Accept that Trading involves risk of loss, and risk of losing all my capital.",
    "Acknowledge that past performance does not guarantee future results.",
    "Accept the performance-based fees charged via my broker, as published on the SmartStox website from time to time.",
    "I authorize my broker to execute trades and deduct the agreed fees.",
    "Acknowledge my understanding of the terms of the 3-month Demo trial period and refund conditions.",
    "Accept the SmartStox Terms of Service, as published on the SmartStox website from time to time.",
  ];

  return (
    <div className="space-y-6">
      {/* Terms List */}
      <div className="bg-[#1a1b1e] rounded-lg p-4 border border-white/10">
        <h4 className="text-white font-semibold mb-3 underline">I hereby:</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          {termsList.map((term, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-gray-500">•</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Agreement Checkbox */}
      <Checkbox
        name="tsCsAccepted"
        control={control}
        label="I hereby agree to all the above."
      />

      {/* Legal Note */}
      <p className="text-xs text-gray-400">
        By clicking this button, I accept and agree that I am entering into a legally binding agreement.
      </p>
    </div>
  );
}

export default TermsStep;
