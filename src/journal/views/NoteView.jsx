import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from 'sweetalert2';

import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components"

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState} = useForm(note);
  const dateString = useMemo(() => new Date(date).toUTCString(), [date]);
  const fileInputRef = useRef();


  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note Updated', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({target}) => {
    if( target.files === 0 ) return;
    
    dispatch( startUploadingFiles( target.files ) );
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container 
      direction="row" 
      justifyContent="space-between" 
      sx={{ mb:1 }}
    >
      <Grid item>
        <Typography fontSize={36} fontWeight="light">{dateString}</Typography>
      </Grid>

      <Grid item>
        <input 
          type="file" 
          multiple 
          ref={ fileInputRef }
          onChange={ onFileInputChange } 
          style={{ display: 'none'}}
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ ()=> fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>
        <Button 
          color="primary" 
          sx={{ padding: 2 }}
          onClick={ onSaveNote }
          disabled={ isSaving }
        >
          <SaveOutlined sx={{ fontSize:30, mr: 1 }} />
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Type a title."
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happend today?"
          minRows={5}
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>
      
      <ImageGallery />
    </Grid>
  )
}
