"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Typography } from "@/components/ui/typography";
import { TextInput, PhoneInput } from "@/components/ui/TextInput";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { PrimaryBTN } from "@/components/ui/PrimaryBTN";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllAmbassadorQuestion, createApplication } from "@/lib/services/ambassador";
import { getAmbassadorAvailableSlots } from "@/lib/services/calendlyAPI";
import type { AmbassadorQuestionsData, AvailableDayWithSpots } from "@/types";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CalendarPicker, DialogBox, Loader } from "@/components/common";
import { parseISO } from "date-fns";

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
  appointmentDate: z.string().min(1, "Please select a meeting time"),
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
      appointmentDate: "",
    }
  });

  const submitMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResult: { message: string } = error.response?.data;
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
      phoneNo: data.mobileNumber,
      email: data.emailAddress,
      appointmentDate: data.appointmentDate,
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
                  type="tel"
                  inputMode="numeric"
                  maxLength={15}
                />
              </div>
              <Controller
                name="appointmentDate"
                control={control}
                render={({ field, fieldState }) => (
                  <MeetingScheduler
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
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

interface MeetingSchedulerProps {
  value?: string;
  onChange?: (dateTime: string) => void;
  error?: string;
}

// Meeting Scheduler Component with DialogBox
function MeetingScheduler({ value, onChange, error }: MeetingSchedulerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate 7-day range: tomorrow to 7 days later at 23:59:59
  const today = new Date();

  // Start: tomorrow at 00:00:00
  const startDateTime = new Date(today);
  startDateTime.setDate(today.getDate() + 1);
  startDateTime.setHours(0, 0, 0, 0);

  // End: 7 days from tomorrow at 23:59:59
  const endDateTime = new Date(startDateTime);
  endDateTime.setDate(startDateTime.getDate() + 6); // +6 because tomorrow is day 1
  endDateTime.setHours(23, 59, 59, 0);

  const startDate = startDateTime.toISOString();
  const endDate = endDateTime.toISOString();

  // Fetch available slots from API (static 7-day range)
  const { data: days = [], isLoading, isFetching, error: apiError } = useQuery<AvailableDayWithSpots[]>({
    queryKey: ['ambassador-available-slots', startDate, endDate],
    queryFn: () => getAmbassadorAvailableSlots({ startDate, endDate }),
    enabled: isOpen,
    refetchOnMount: 'always', // Always refetch when component mounts (dialog opens)
    staleTime: 0, // Data is immediately stale to trigger refetch
  });

  // Show loader on initial load OR during refetch
  const showLoader = isLoading || (isFetching);

  const handleSelectSpot = (_date: string, spot: { start_time: string }) => {
    // spot.start_time is a UTC ISO string (e.g., "2026-04-27T07:00:00Z")
    // Parse it as UTC, then convert to local time for storage
    const utcDate = parseISO(spot.start_time);
    
    // Convert UTC to local ISO string
    onChange?.(utcDate.toISOString());
    setIsOpen(false);
  };

  // Parse value to display (convert UTC to local)
  const selectedSlot = value ? (() => {
    const localDate = new Date(value); // Native Date parses ISO and converts to local
    return {
      date: localDate.toLocaleDateString('en-CA'), // YYYY-MM-DD in local time
      time: localDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) // Local time: 12:30 PM
    };
  })() : null;

  return (
    <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-white mb-2">
        Meeting Time <span className="text-red-500">*</span>
      </label>
      {selectedSlot ? (
        <div
          className={`flex items-center justify-between bg-[#2A73EA]/10 border rounded-lg p-4 ${
            error ? "border-red-500" : "border-white/60"
          }`}
        >
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm text-gray-400">Selected Meeting: </p>
            <p className="text-white font-medium">{selectedSlot.date} at {selectedSlot.time}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-[#2A73EA] hover:text-white cursor-pointer text-sm font-medium"
          >
            Change
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className={`w-full py-3 px-4 border rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
            error
              ? "border-red-500 bg-transparent"
              : "border-white/60 bg-transparent hover:bg-[#2A73EA]/10"
          }`}
        >
          <span className="text-gray-400 text-sm">
            Select Meeting Time
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${error ? "text-red-400" : "text-white/60"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <DialogBox
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        heading="Select a Date & Time"
        allowClose={true}
        resizeable={true}
        isHeaderVisible={false}
        className="!p-0"
      >
        {showLoader ? (
          <div className="flex items-center justify-center h-64 w-full bg-[#0f0f0f] rounded-xl">
            <Loader text="Loading available slots..." className="text-white" size={28} />
          </div>
        ) : apiError ? (
          <div className="flex items-center justify-center h-64 w-full bg-[#0f0f0f] rounded-xl">
            <div className="text-red-400">Failed to load slots. Please try again.</div>
          </div>
        ) : (
          <CalendarPicker
            days={days}
            onSelectSpot={handleSelectSpot}
          />
        )}
      </DialogBox>
    </div>
  );
}
