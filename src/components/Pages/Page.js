import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import RegisterPage from "./RegisterPage";
import ReviewPage from "./ReviewPage";
import LoginPage from "./LoginPage";
import CoursePage from "./CoursePage";
import sendQuery from "../../hooks/sendQuery";
import { message } from "antd";
import queryBuilder from "../../hooks/queryBuilder";
import DashboardPage from "./DashboardPage";
import Copyright from "../../utils/Copyright";
import Cookies from 'js-cookie'
import connect from "../../hooks/connect";

const steps = ["Sign up", "Choose courses", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RegisterPage />;
    case 1:
      return <CoursePage />;
    case 2:
      return <ReviewPage />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

const Page = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [login, setLogin] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [finalMessage, setFinalMessage] = React.useState("");
  const handleNext = () => {
    if (activeStep === 0) {
      sendQuery(window.localStorage.getItem("verificationQuery"), true).then(
        function (res) {
          if (res === "New") {
            setActiveStep(activeStep + 1);
          } else if (res === "Found") {
            message.warning({
              content: "This user already exists",
              style: { marginTop: "6vh" },
            });
          } else {
            message.error({
              content: "Error : Try again",
              style: { marginTop: "6vh" },
            });
          }
        }
      );
    } else if (activeStep === 1) {
      message.success({
        content: "Courses added",
        style: { marginTop: "6vh" },
      });
      setActiveStep(activeStep + 1);
    } else {
      let values = JSON.parse(window.localStorage.getItem("registerQuery"));
      sendQuery(queryBuilder(values)).then(function (res) {
        if (res === "Error") {
          message.error({
            content: "Error : Try again",
            style: { marginTop: "6vh" },
          });
        } else {
          message.success({
            content: "Registered",
            style: { marginTop: "6vh" },
          });
          connect(values.status,values.email)
          Cookies.set("status", values.status)
          Cookies.set("email", values.email)
          setActiveStep(activeStep + 1);
          setFinalMessage(
            `Welcome to the Graph ${values.first_name}, you can now view all the graph .`
          );
          window.localStorage.setItem("registerQuery", "");
          window.localStorage.setItem("verificationQuery", "");
        }
      });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {login ? (
        <LoginPage />
      ) : view ? (
        <DashboardPage />
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: "relative",
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                NoSQL Project : Neo4J
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Register
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your registration.
                    </Typography>
                    <Typography variant="subtitle1">{finalMessage}</Typography>
                    <p align="right">
                      <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1, backgroundColor: "green" }}
                        onClick={() => setView(true)}
                      >
                        Go to the graph
                      </Button>
                    </p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}
                      {activeStep === 0 && (
                        <Grid item>
                          <Button
                            sx={{ mt: 3, ml: 1 }}
                            onClick={() => setLogin(true)}
                          >
                            Already have an account? Sign in
                          </Button>
                        </Grid>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        style={{
                          backgroundColor: "green",
                        }}
                      >
                        {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Copyright />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default Page;
