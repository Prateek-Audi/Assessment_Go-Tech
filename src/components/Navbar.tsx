import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../auth/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleUsersListClick = () => {
    navigate("/users");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.1em",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 5)",
            }}
            onClick={handleLogoClick}
          >
            Demo
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
        
          <Button color="inherit" onClick={handleProfileClick}>
          {user?.username.toUpperCase()}'s Profile
          </Button>
          <Button color="inherit" onClick={handleUsersListClick}>
            Users List
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
