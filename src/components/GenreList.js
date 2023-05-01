import Reat from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
function GenreList({genres}) {
    
  return (
    genres.map((genre) => {
    //   <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={genre.id}>
    //   <nav aria-label="main mailbox folders">
    //     <List>
    //       <ListItem disablePadding>
    //         <ListItemButton>
    //           <ListItemText primary={`${genres.name}`} />
    //         </ListItemButton>
    //       </ListItem>
    //     </List>
    //   </nav>
    //   <Divider />    
    // </Box>

    })
    )
}

export default GenreList;
