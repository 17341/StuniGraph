import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel,Select,MenuItem,FormControl,Switch,FormControlLabel } from '@mui/material';
import CoursesDict from '../../utils/CoursesDict';
import verificationQuery from '../../hooks/verificationQuery';


const theme = createTheme();

const RegisterPage = () => {
  const [status, setStatus] = React.useState("STUDENT")
  const [switched, setSwitched] = React.useState(false);

  let values = {
    status : undefined,
    first_name : undefined,
    last_name : undefined,
    identification : undefined,
    grade : undefined,
    email : undefined,
    salary : undefined,
    acronym : undefined,
    password : undefined
  }

  window.localStorage.setItem("registerQuery",JSON.stringify(values))

  const handleChange = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    values = {
      status : data.get('status'),
      first_name : data.get('firstName'),
      last_name : data.get('lastName'),
      identification : data.get('identification'),
      grade : data.get('grade'),
      email : data.get('email'),
      salary : data.get('salary'),
      acronym : data.get('identification'),
      password : data.get('password'),
    }

    window.localStorage.setItem("registerQuery",JSON.stringify(values))
    window.localStorage.setItem("verificationQuery", verificationQuery({status : data.get('status'), email : data.get('email')}))
    
  };

 
  return (
    <>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography> */}
              <Box component="form" noValidate onChange={handleChange} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <InputLabel id="status">Status</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        label="Status"
                        name ="status"
                        required
                        fullWidth
                        autoFocus
                        defaultValue = "STUDENT"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="TEACHER">Teacher</MenuItem>
                        <MenuItem value="STUDENT">Student</MenuItem>
                      </Select>
                    </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  {
                    status=== "STUDENT"  
                    ?
                    <>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="grade">Grade</InputLabel>
                      <Select 
                        labelId="grade"
                        id="grade"
                        label="Grade"
                        name ="grade"
                        required
                        fullWidth
                        autoFocus
                        >
                            {Object.keys(CoursesDict).map(key => <MenuItem value={key}>{key}</MenuItem>)}
                      </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="identification"
                        label="Matricule"
                        name="identification"
                        autoComplete="identification"
                        type = "number"
                      />
                    </Grid>
                    
                  </>
                  :
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                          required
                          fullWidth
                          id="identification"
                          label="Acronym"
                          name="identification"
                          autoComplete="identification"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="salary"
                        label="Salary"
                        name="salary"
                        autoComplete="salary"
                        type = "number"
                      />
                    </Grid>
                  </>
                  }
                  
                </Grid>
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    backgroundColor: "green",
                  }}
                >
                  Sign Up
                </Button>
                <Grid item xs>
                  <Button 
                  fullWidth
                  variant="contained"
                  onClick ={() => setLogin(true)}
                  >
                    Already have an account? Sign in
                  </Button>
                </Grid> */}
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </ThemeProvider>
    </>
  );
}

export default RegisterPage;