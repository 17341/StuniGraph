import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import Page from "./Page";
import Image from "../../Graph.jpeg";
import { message } from "antd";
import sendQuery from "../../hooks/sendQuery";
import verificationQuery from "../../hooks/verificationQuery";
import Copyright from "../../utils/Copyright";
import DashboardPage from "./DashboardPage";
import connect from "../../hooks/connect";
import Cookies from 'js-cookie'

const theme = createTheme();

const LoginPage = () => {
  const [register, setRegister] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendQuery(
      verificationQuery({
        status: data.get("status"),
        email: data.get("email"),
      }),
      true
    ).then(function (res) {
      if (res.length === 0) {
        message.warning("Account not found");
      } else if (res.length  !== 0) {
        sendQuery(
          verificationQuery(
            {
              status: data.get("status"),
              email: data.get("email"),
              password: data.get("password"),
            },
            true
          ),
          true
        ).then(function (res) {
          if (res.length === 0) {
            message.warning("Incorrect Password");
          } else if (res.length  !== 0) {
            message.success("Connected");
            connect(data.get("status"), data.get("email"))
            Cookies.set("status", data.get("status"))
            Cookies.set("email", data.get("email"))
            setLogin(true);
          } else {
            message.error("Error : Try again");
          }
        });
      } else {
        message.error("Error : Try again");
      }
    });
  };

  return (
    <>
      {login ? (
        <DashboardPage />
      ) : !register ? (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${Image})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit}
                >
                  <FormControl fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      label="Status"
                      name="status"
                      required
                      fullWidth
                      autoFocus
                      defaultValue="STUDENT"
                    >
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="TEACHER">Teacher</MenuItem>
                      <MenuItem value="STUDENT">Student</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "green",
                    }}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Button fullWidth onClick={() => setRegister(true)}>
                        Don't have an account? Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <Page />
      )}
    </>
  );
};
export default LoginPage;
