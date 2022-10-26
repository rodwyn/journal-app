import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    refreshNotes: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map( note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${ action.payload.title }, was updated correctly.`
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [ ...(state.active.imageUrls || []), ...action.payload ];
      state.isSaving = false;
    },
    clearNotes: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {},
  }
});

// Action creators are generated for each case reducer function
export const { 
  addEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  refreshNotes,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotes
} = journalSlice.actions;
