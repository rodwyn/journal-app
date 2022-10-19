import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container 
      direction="row" 
      justifyContent="space-between" 
      sx={{ mb:1 }}
    >
      <Grid item>
        <Typography fontSize={36} fontWeight="light">October 31th 2023</Typography>
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
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happend today?"
          minRows={5}
        />
      </Grid>
      
      <ImageGallery />
    </Grid>
  )
}
