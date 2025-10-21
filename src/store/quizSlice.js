import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: [],
  xp: 0        
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveAnswer: (state, action) => {
      const { questionIndex, selected, correct } = action.payload;
      const existing = state.answers.find(ans => ans.questionIndex === questionIndex);
      if (!existing) {
        state.answers.push({ questionIndex, selected, correct });
        if (selected === correct) {
          state.xp += 1; 
        }
      }
    },
    resetAnswers: (state) => {
      state.answers = [];
      state.xp = 0; // ✅ Reset XP on restart
    }
  }
});

export const selectMistakeCount = (state) =>
  state.quiz.answers.filter(ans => ans.selected !== ans.correct).length;
export const selectXP = (state) => state.quiz.xp;

export const { saveAnswer, resetAnswers } = quizSlice.actions;
export default quizSlice.reducer;
