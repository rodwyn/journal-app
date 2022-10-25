import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components"

export const NoteView = () => {
  const { active:note } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState} = useForm(note);
  const dateString = useMemo(() => new Date(date).toUTCString(), [date]);

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
        <Button color="primary" sx={{ padding: 2 }}>
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
