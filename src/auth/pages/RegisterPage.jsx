import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from "../layout/AuthLayout"

const formValidations = {
  email: [ value => value.includes('@'), 'Type a correct email address.'],
  password: [ value => value.length >= 6, 'Type a password of at least 6 characters.'],
  displayName: [ value => value.length >= 1, 'This value is required.']
};

const formData = {
  email: '',
  password: '',
  displayName: ''
};

export const RegisterPage = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const { 
    displayName,
    email,
    password, 
    onInputChange, 
    formState, 
    displayNameValid,
    passwordValid,
    emailValid,
    isFormValid
  } =useForm(formData, formValidations);

  const onSubmit = event => {
    event.preventDefault();
    setFormSubmited(true);
    console.log(formState);
  };


  return (
    <AuthLayout title="Create Account">
      <form onSubmit={ onSubmit }>
          <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Name"
                type="text"
                placeholder="Your name"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={!!displayNameValid && formSubmited}
                helperText={ displayNameValid }
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="email"
                type="email"
                placeholder="user@mail.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={!!emailValid && formSubmited}
                helperText={ emailValid }
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="********"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={!!passwordValid && formSubmited}
                helperText={ passwordValid }
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt: 2 }}>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end" >
              <Typography sx={{ mr:1 }}>Do you have an account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Login 
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
