import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://dummyjson.com/users/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundColor: "#f5f5f5" }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        pt={8}
      >
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={user?.image}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Username: {user?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {user?.gender}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default UserProfile;
