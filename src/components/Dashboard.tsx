import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import data from "../data/data.json";
import { User } from "../types/types";
import SearchIcon from "@mui/icons-material/Search";

type EditableUser = User & { id: number };

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState<EditableUser>({
    id: -1,
    username: "",
    email: "",
    sentMails: 0,
    activityTime: "",
    activityStatus: "",
  });
  const [dateRange, setDateRange] = useState<string>("last7days");

  useEffect(() => {
    setUsers(data as User[]);
  }, []);

  const handleOpen = (user?: User) => {
    if (user) {
      setNewUser(user as EditableUser);
      setIsEditing(true);
    } else {
      setNewUser({
        id: -1,
        username: "",
        email: "",
        sentMails: 0,
        activityTime: "",
        activityStatus: "",
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({
      id: -1,
      username: "",
      email: "",
      sentMails: 0,
      activityTime: "",
      activityStatus: "",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setNewUser({ ...newUser, activityStatus: e.target.value });
  };

  const handleSaveUser = () => {
    if (isEditing) {
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    handleClose();
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDateRangeChange = (e: SelectChangeEvent<string>) => {
    setDateRange(e.target.value);
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Container
          maxWidth="lg"
          sx={{
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
            "::-webkit-scrollbar": {
              width: "6px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            sx={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "8px",
              position: "relative",
            }}
          >
            <Typography variant="h4" sx={{ py: 2 }}>
              Dashboard
            </Typography>
            <TextField
              placeholder="Search for users"
              size="small"
              sx={{
                borderRadius: "4px",
                backgroundColor: "#f2f2f2",
                width: "24rem",
                "& .MuiOutlinedInput-root": {
                  height: "30px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px",
                  fontSize: "12px",
                  paddingLeft: '0px'
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "12px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "16px", color: "#888" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            my={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ fontWeight: "bold" }}
          >
            <Typography sx={{ fontWeight: "bold" }}>All users</Typography>
            <Box display="flex" alignItems="center">
              <Typography sx={{ mr: 1, fontSize: "12px" }}>
                Date Range
              </Typography>
              <FormControl size="small" sx={{ width: "120px" }}>
                <Select
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  sx={{
                    borderRadius: "0.25rem",
                    height: '25px',
                    "& .MuiOutlinedInput-root": {
                      height: "25px",
                      "& fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiSelect-select": {
                      padding: "8px",
                      fontSize: "12px",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "#f2f2f2",
                    },
                  }}
                >
                  <MenuItem
                    value="last7days"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Last 7 Days
                  </MenuItem>
                  <MenuItem
                    value="last30days"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Last 30 Days
                  </MenuItem>
                  <MenuItem
                    value="custom"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Custom Range
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              maxHeight: "calc(100vh - 227px)",
              overflowY: "auto",
              paddingRight: "8px",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #f1f1f1",
              "::-webkit-scrollbar": {
                width: "6px",
              },
              "::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      Username
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      Sent Mails
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      Activity Time
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      Activity Status
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#f2f2f2" }}
                    >
                      <IconButton color="primary" onClick={() => handleOpen()}>
                        <AddCircle />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          padding: "4px 16px",
                          height: "40px",
                        }}
                      >
                        {user.username}
                      </TableCell>
                      <TableCell sx={{ padding: "4px 16px", height: "40px" }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ padding: "4px 16px", height: "40px" }}>
                        {user.sentMails}
                      </TableCell>
                      <TableCell sx={{ padding: "4px 16px", height: "40px" }}>
                        {user.activityTime}
                      </TableCell>
                      <TableCell sx={{ padding: "4px 16px", height: "40px" }}>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor:
                                user.activityStatus === "Active"
                                  ? "green"
                                  : "red",
                              marginRight: 1,
                            }}
                          />
                          {user.activityStatus}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "4px 16px", height: "40px" }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpen(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit User" : "Add New User"}
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sent Mails"
            name="sentMails"
            value={newUser.sentMails}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Activity Time"
            name="activityTime"
            value={newUser.activityTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Activity Status</InputLabel>
            <Select
              label="Activity Status"
              name="activityStatus"
              value={newUser.activityStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} textAlign="right">
            <Button variant="contained" onClick={handleSaveUser}>
              {isEditing ? "Save" : "Add User"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
