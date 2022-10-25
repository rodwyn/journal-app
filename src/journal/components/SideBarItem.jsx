import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({title = '', body, id, date, imageUrls=[] }) => {
  const newTitle = useMemo(() => {
    return title.length > 18
      ? title.substring(0, 18) + '...'
      : title
  }, [title]);

  const dispatch = useDispatch();

  const setNote = () => {
    dispatch(setActiveNote({title, body, id, date, imageUrls}));
  };

  return (
    <ListItem  disablePadding>
      <ListItemButton onClick={setNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
