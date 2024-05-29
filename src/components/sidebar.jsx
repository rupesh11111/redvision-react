import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function SideBar({ drawerOpen, setDrawerOpen }) {

  let authUser = localStorage.getItem('user') || "{}"
  authUser = (authUser == undefined) ? "{}" : authUser;
  authUser = JSON.parse(authUser)
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };
  
  let sidebarData = []

  if (authUser.role == "user") {
    sidebarData = [
      {
        name: 'Home',
        route: "/"
      },
      {
        name: 'Carts',
        route: "/cart"
      },
      {
        name: 'Orders',
        route: "/myOrder"
      },
    ]
  }

  if (authUser.role == "admin") {
    sidebarData = [
      {
        name: 'Dashboard',
        route: "dashboard/"
      },
      {
        name: 'All Orders',
        route: "/allOrder"
      },
      {
        name: 'Products',
        route: "/products"
      },
      {
        name: 'Create Products',
        route: "/productCreate"
      },
    ]
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sidebarData.map((sidebar, index) => (
          <ListItem key={sidebar.name} disablePadding>
            <ListItemButton onClick={() => navigate(sidebar.route)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={sidebar.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}