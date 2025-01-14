import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormSubmission } from '../types/content';

interface SubmissionsState {
  submissions: FormSubmission[];
  addSubmission: (submission: FormSubmission) => void;
  getSubmissions: (formId?: string) => FormSubmission[];
  updateStatus: (id: string, status: FormSubmission['status']) => void;
  deleteSubmission: (id: string) => void;
}

export const useSubmissionsStore = create<SubmissionsState>()(
  persist(
    (set, get) => ({
      submissions: [],
      
      addSubmission: (submission) => {
        set((state) => ({
          submissions: [submission, ...state.submissions]
        }));
      },

      getSubmissions: (formId) => {
        const { submissions } = get();
        if (formId) {
          return submissions.filter(s => s.formId === formId);
        }
        return submissions;
      },

      updateStatus: (id, status) => {
        set((state) => ({
          submissions: state.submissions.map((s) =>
            s.id === id ? { ...s, status } : s
          )
        }));
      },

      deleteSubmission: (id) => {
        set((state) => ({
          submissions: state.submissions.filter((s) => s.id !== id)
        }));
      },
    }),
    {
      name: 'form-submissions'
    }
  )
);