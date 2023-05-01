import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function GenreList({ genres }) {
  return genres.map((genre) => {
   return (<Box
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      key={genre.id}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={`${genre.name}`} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>)
  });
}

export default GenreList;
