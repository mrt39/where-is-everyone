import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


export default function ClickMenu({clickCoordinates, setclickMenuDisplay, clickMenuDisplay, open}) {

  const handleClose = () => {
    setclickMenuDisplay(null);
  };
  return (
    <React.Fragment>
      <Menu
        anchorEl={clickMenuDisplay}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        /* adjusting position for the menu to appear on mouse click position
        https://mui.com/material-ui/react-popover/#anchor-playground*/
        anchorReference="anchorPosition"
        anchorPosition={{ top: clickCoordinates[1]+40, left: clickCoordinates[0]-53 }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
