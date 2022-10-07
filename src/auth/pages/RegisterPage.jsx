import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
          <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Name"
                type="text"
                placeholder="Your name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="email"
                type="email"
                placeholder="user@mail.com"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="********"
                fullWidth
              />
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb:2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  <Google />
                  <Typography sx={{ ml:1 }}>Google</Typography>
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
