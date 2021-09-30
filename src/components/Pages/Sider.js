import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PreviewIcon from "@mui/icons-material/Preview";
import TimelineIcon from "@mui/icons-material/Timeline";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router-dom";
import List from '@mui/material/List';

const Sider = () => {
  const history = useHistory();
  
  return (
    <List>
      <ListSubheader inset>Dashboard</ListSubheader>
      <ListItem button onClick={() => history.push("/dashboard/overview")}>
        <ListItemIcon>
          <PreviewIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
      <ListItem button onClick={() => history.push("/dashboard/coursecloud")}>
        <ListItemIcon>
          <WbCloudyIcon />
        </ListItemIcon>
        <ListItemText primary="Course Cloud" />
      </ListItem>
      <ListItem button onClick={() => history.push("/dashboard/graph")}>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Graph" />
      </ListItem>
    </List>
  );
};
export default Sider;

// const S = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <AccountCircleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Profile" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AddIcon />
//       </ListItemIcon>
//       <ListItemText primary="Add" />
//     </ListItem>
//   </div>
// );
