import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB} from '../../firebase/config'
import { fileUpload, loadNotes } from "../../helpers";
import { addEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, refreshNotes, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";

export const startNewNote = () => {
  return async(dispatch, getState) => {
    dispatch(savingNewNote());
    
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    
    const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
};

export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {
    const { uid } = getState().auth;
    if ( !uid ) throw new Error('Not user found.')

    const notes = await loadNotes(uid);

    dispatch( setNotes(notes));
  }
};

export const startSaveNote = () => {
  return async( dispatch, getState ) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(refreshNotes(note));
  }
};

export const startUploadingFiles = (files= []) => {
  return async(dispatch) => {
    dispatch(setSaving());

    // await fileUpload( files[0] );

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload( file ));
    }

    const photosURLs = await Promise.all( fileUploadPromises );

    dispatch(setPhotosToActiveNote(photosURLs));
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
    await deleteDoc(docRef);

    dispatch( deleteNoteById(note.id));
  }
}
