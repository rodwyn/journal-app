import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = ( email, password ) => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
  }
};

export const startGoogleSignin = ( ) => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
    const result= await singInWithGoogle();

    if (!result.ok) return (logout(result.errorMessage));

    dispatch( login( result ));
  }
};