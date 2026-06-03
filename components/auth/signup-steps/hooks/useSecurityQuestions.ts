import { useState, useEffect } from "react";
import type { SelectOption } from "@/components/common/SelectDropdown";
import { getUserSecurityQuestions } from "@/lib/services/auth";
import type { SecurityQuestionItem } from "@/types";
import type { SecurityQuestionsCache } from "../schema";

export function useSecurityQuestions() {
  const [questions, setQuestions] = useState<{
    group100: SelectOption[];
    group200: SelectOption[];
  }>({ group100: [], group200: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<SecurityQuestionsCache>({ group100: [], group200: [] });

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await getUserSecurityQuestions('ENG', '0002');
        if (response.status && response.data) {
          const newCache = {
            group100: response.data['100'] || [],
            group200: response.data['200'] || [],
          };
          setCache(newCache);

          // Map to dropdown options using value field
          const mapToOptions = (items: SecurityQuestionItem[]): SelectOption[] =>
            items.map((item) => ({
              value: item.value,
              label: item.label,
            }));

          setQuestions({
            group100: mapToOptions(response.data['100'] || []),
            group200: mapToOptions(response.data['200'] || []),
          });
        }
      } catch (error) {
        console.error('Failed to fetch security questions:', error);
        setError('Failed to load security questions');
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  return { questions, isLoading, error, cache };
}

export function getQuesNoFromValue(value: string, group: '100' | '200', cache: SecurityQuestionsCache): string {
  const questions = group === '100' ? cache.group100 : cache.group200;
  const question = questions.find((q) => q.value === value);
  return question?.quesNo || (group === '100' ? '100' : '200');
}
