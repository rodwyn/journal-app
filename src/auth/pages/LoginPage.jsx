import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleSignin, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth);
  const dispatch = useDispatch()
  const { email, password, onInputChange } =useForm({
    email: '',
    password: ''
  });

  const isAuthenticated = useMemo(() => status === 'checking', [status])

  const onSubmit = event => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({email, password}));
  };

  const onGoogleSignin = () => {
    console.log('onGoogleSignin');
    dispatch(startGoogleSignin());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="email"
                type="email"
                placeholder="user@mail.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
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
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt: 2 }}>
              <Grid 
                item 
                xs={12}
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={ isAuthenticated }
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={ onGoogleSignin }
                  disabled={ isAuthenticated }
                >
                  <Google />
                  <Typography sx={{ ml:1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end" >
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Create an account
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
