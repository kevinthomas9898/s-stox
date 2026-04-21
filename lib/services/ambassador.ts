import api from '@/lib/api/axiosInstance';
import type {
  ApiResponse,
  AmbassadorQuestionsData,
  GetAllAmbassadorQuestionParams,
  CreateApplicationParams,
  CreateApplicationResponse,
} from '@/types';

/**
 * Get all ambassador questions.
 * Returns questions with their options grouped by question keys (Q1, Q2, etc.).
 */
export async function getAllAmbassadorQuestion(
  params: GetAllAmbassadorQuestionParams = { LangCode: 'ENG', LanguageDialectCode: '0002' }
): Promise<AmbassadorQuestionsData> {
  const { data } = await api.get<ApiResponse<AmbassadorQuestionsData>>('/Ambassador/getAllAmbassadorQuestion', {
    params,
  });
  return data.data;
}

/**
 * Submit ambassador application.
 * Creates a new application with selected answers.
 */
export async function createApplication(
  params: CreateApplicationParams
): Promise<CreateApplicationResponse> {
  const { data } = await api.post<CreateApplicationResponse>(
    '/Ambassador/create-application',
    params
  );
  return data;
}
