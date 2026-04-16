"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import { TextInput, PhoneInput } from "@/components/ui/TextInput";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { PrimaryBTN } from "@/components/ui/PrimaryBTN";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  marketingBase: z.string().min(1, "Please select an option"),
  yearsOfExperience: z.string().min(1, "Please select an option"),
  availabilityToStart: z.string().min(1, "Please select an option"),
  employmentStatus: z.string().min(1, "Please select an option"),
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  emailAddress: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  countryCode: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof formSchema>;

export function AmbassadorApplicationSection() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketingBase: "",
      yearsOfExperience: "",
      availabilityToStart: "",
      employmentStatus: "",
      firstName: "",
      surname: "",
      emailAddress: "",
      mobileNumber: "",
      countryCode: "US",
    }
  });

  // TODO: Replace with your actual Calendly event link
  // Example: "https://calendly.com/yourcompany/30min-interview"
  const CALENDLY_EVENT_URL = "https://calendly.com/kevin-avdevs/30min";

  const onSubmit = async (data: FormData) => {
    const message = `
Marketing Base: ${data.marketingBase}
Experience: ${data.yearsOfExperience}
Availability: ${data.availabilityToStart}
Employment: ${data.employmentStatus}
Phone: +${data.countryCode} ${data.mobileNumber}
  `.trim();

    const params = new URLSearchParams({
      name: `${data.firstName} ${data.surname}`,
      email: data.emailAddress,
      a1: message, // single combined field
    });

    const calendlyUrl = `${CALENDLY_EVENT_URL}?${params.toString()}`;
    window.open(calendlyUrl, "_blank");
  };

  return (
    <section className="py-16 relative w-full">
      <SectionWrapper>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Typography variant="h3" className="text-center text-white mb-12">
            Ambassador <span className="text-[#2A73EA]">Application</span>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-5">
            {/* Left Column */}
            <div className="space-y-8">
              <Typography variant="h4" className="text-[#00D094]">
                QUALIFYING CRITERIA
              </Typography>

              <SelectDropdown
                name="marketingBase"
                control={control}
                label="Marketing Base"
                subLabel={
                  <>
                    (Your Existing Client Base for any other products or Service, or Social Media<br />
                    Followers (YouTube, Facebook, TikTok)
                  </>
                }
                criteria="Criteria : Minimum 25,000"
                options={[
                  { label: "0-25k", value: "0-25k" },
                  { label: "25k-100k", value: "25k-100k" },
                  { label: "100k+", value: "100k+" },
                ]}
              />

              <SelectDropdown
                name="yearsOfExperience"
                control={control}
                label="Years of Experience"
                subLabel="(Your experience as a marketer of any other products or services.)"
                criteria="Criteria : Minimum 3 years"
                options={[
                  { label: "0-3 years", value: "0-3" },
                  { label: "3-5 years", value: "3-5" },
                  { label: "5+ years", value: "5+" },
                ]}
              />

              <SelectDropdown
                name="availabilityToStart"
                control={control}
                label="Availability to Start"
                subLabel="(Your availability to start)"
                criteria="Criteria : Immediate"
                options={[
                  { label: "Immediate", value: "immediate" },
                  { label: "Within 1 week", value: "1_week" },
                  { label: "Within 1 month", value: "1_month" },
                ]}
              />

              <SelectDropdown
                name="employmentStatus"
                control={control}
                label="Independent or Employed"
                subLabel="Please select your preferred terms of engagement"
                options={[
                  { label: "Independent", value: "independent" },
                  { label: "Employed", value: "employed" }
                ]}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Typography variant="h4" className="text-[#00D094]">
                YOUR INFORMATION
              </Typography>

              <div className="space-y-6">
                <TextInput name="firstName" control={control} label="First Name" placeholder="John" />
                <TextInput name="surname" control={control} label="Surname" placeholder="Doe" />
                <TextInput name="emailAddress" control={control} label="Email Address" type="email" placeholder="johndoe@example.com" />

                <PhoneInput
                  name="mobileNumber"
                  control={control}
                  countryCodeName="countryCode"
                  label="Mobile Number"
                  placeholder="00000 00000"
                />
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 mt-8 flex justify-center pb-2">
              <PrimaryBTN type="submit" loading={isSubmitting} className="w-auto px-8 h-[44px]">
                Schedule An Appointment Interview
              </PrimaryBTN>
            </div>
          </form>
        </div>
      </SectionWrapper>
    </section>
  );
}
