import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ViewPage from "./ViewPage";
import Copyright from "../../utils/Copyright";
import disconnect from "../../hooks/disconnect";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import LoginPage from "./LoginPage";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import TagCloud from "../Charts/TagCloud";
import LineChart from "../Charts/LineChart";
import Sider from "./Sider";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import AddPage from "./AddPage";
import ModifyPage from "./ModifyPage";
import DeletePage from "./DeletePage";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const DashboardPage = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  const [connected, setConnected] = React.useState(true);
  const history = useHistory();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let status = Cookies.get("status");
  return connected ? (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: "black",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              NoSQL Graph with Neo4j
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                disconnect(
                  Cookies.get("status"),
                  Cookies.get("email"),
                  Cookies.get("password")
                );
                message.warning({
                  content: "Disconnected",
                  style: { marginTop: "6vh" },
                });
                setConnected(false);
                history.push("/login");
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Sider status={status} />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {items && items.includes("overview") ? (
                <>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                      }}
                    >
                      <LineChart />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                      }}
                    >
                      <PieChart />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                      }}
                    >
                      <BarChart />
                    </Paper>
                  </Grid>
                </>
              ) : (
                ""
              )}
              {items && items.includes("coursecloud") ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 600,
                    }}
                  >
                    <TagCloud />
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {/* Recent Deposits */}

              {/* Recent Orders */}
              {items && items.includes("graph") ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
                      padding: "20px",
                      backgroundColor: "white",
                    }}
                  >
                    <ViewPage query = "MATCH (n)-[r]->(m) RETURN *"/>
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {items && items.includes("add") ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
                      padding: "20px",
                      backgroundColor: "white",
                    }}
                  >
                    <AddPage />
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {items && items.includes("modify") ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
                      padding: "20px",
                      backgroundColor: "white",
                    }}
                  >
                    <ModifyPage />
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
              {items && items.includes("delete") ? (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      boxShadow: "0 4px 30px 0 rgba(0, 0, 0, 0.05)",
                      padding: "20px",
                      backgroundColor: "white",
                    }}
                  >
                    <DeletePage />
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <LoginPage />
  );
};

export default DashboardPage;
