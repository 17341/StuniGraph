import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel,Select,MenuItem,FormControl } from '@mui/material';
import LoginPage from './LoginPage';
import CoursesDict from '../../utils/CoursesDict';
import sendQuery from '../../hooks/sendQuery';
import { message } from 'antd';
import verificationQuery from '../../hooks/verificationQuery';
import App from '../../App';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/17341">
        FrigoFri
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const RegisterPage = () => {
  const [login, setLogin] = React.useState(false)
  const [status, setStatus] = React.useState("STUDENT")
  const [registered, setRegistered] = React.useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let query
    status == "STUDENT" 
    ?
    query = `MERGE (x:${data.get('status')} {firstname: "${data.get('firstName')}",lastname :"${data.get('lastName')}",
      matricule : "${data.get('identification')}", grade : "${data.get('grade')}",email :"${data.get('email')}", password :"${data.get('password')}"})`
    :
    query = `MERGE (x:${data.get('status')} {firstname: "${data.get('firstName')}",lastname :"${data.get('lastName')}", 
    salary :"${data.get('salary')}",acronym : "${data.get('identification')}",email :"${data.get('email')}", password :"${data.get('password')}"})`

    sendQuery(verificationQuery({status : data.get('status'), email : data.get('email')}),true)
            .then(function(res){
                if(res == "New") { sendQuery(query); message.success("Registered"); setRegistered(true)}
                else if(res == "Found") {message.warning("This user already exists")}
                else{message.error("Error : Try again")}
            })
  };

  return (
    <>
    {
      registered ? <App/> : 
      login ? <LoginPage/> :
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                </Grid>
                <Button
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
                <Grid container justifyContent="flex-end">
                  <Grid item xs>
                          <Button 
                          fullWidth
                          variant="contained"
                          onClick ={() => setLogin(true)}
                          >
                            Already have an account? Sign in
                          </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
    }
    </>
  );
}

export default RegisterPage;