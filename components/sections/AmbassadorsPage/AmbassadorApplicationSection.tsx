"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import { TextInput, PhoneInput } from "@/components/ui/TextInput";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { PrimaryBTN } from "@/components/ui/PrimaryBTN";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllAmbassadorQuestion, createApplication } from "@/lib/services/ambassador";
import type { AmbassadorQuestionsData } from "@/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
  const { data: questions, isLoading: isLoadingQuestions } = useQuery<AmbassadorQuestionsData>({
    queryKey: ['ambassador-questions'],
    queryFn: () => getAllAmbassadorQuestion(),
    staleTime: Infinity
  });

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

  const submitMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      if(error instanceof AxiosError) {
        const errorResult: {message: string} = error.response?.data;
        const message = errorResult.message || error?.message;
        toast.error(message);
      } else {
        toast.error(error?.message ?? "Failed to submit application");
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    await submitMutation.mutateAsync({
      countryCode: data.countryCode,
      firstName: data.firstName,
      surname: data.surname,
      email: data.emailAddress,
      number: data.mobileNumber,
      ambassadorQuesAnswerList: [
        { questionNumber: "100", answerNumber: data.marketingBase },
        { questionNumber: "200", answerNumber: data.yearsOfExperience },
        { questionNumber: "300", answerNumber: data.availabilityToStart },
        { questionNumber: "400", answerNumber: data.employmentStatus },
      ],
    });
  };

  return (
    <section className="py-16 relative w-full">
      <SectionWrapper>
        <div className="mx-auto">
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
                options={questions?.["100"] ?? []}
                disabled={isLoadingQuestions}
              />

              <SelectDropdown
                name="yearsOfExperience"
                control={control}
                label="Years of Experience"
                subLabel="(Your experience as a marketer of any other products or services.)"
                criteria="Criteria : Minimum 3 years"
                options={questions?.["200"] ?? []}
                disabled={isLoadingQuestions}
              />

              <SelectDropdown
                name="availabilityToStart"
                control={control}
                label="Availability to Start"
                subLabel="(Your availability to start)"
                criteria="Criteria : Immediate"
                options={questions?.["300"] ?? []}
                disabled={isLoadingQuestions}
              />

              <SelectDropdown
                name="employmentStatus"
                control={control}
                label="Independent or Employed"
                subLabel="Please select your preferred terms of engagement"
                options={questions?.["400"] ?? []}
                disabled={isLoadingQuestions}
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
              <PrimaryBTN type="submit" loading={isSubmitting || submitMutation.isPending} className="w-auto px-8 h-[44px]">
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </PrimaryBTN>
            </div>
          </form>
        </div>
      </SectionWrapper>
    </section>
  );
}
