import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Testing authSlice.js', () => {
  test('should return initialState.', () => {
    const state = authSlice.reducer( initialState, {});
    expect(state).toEqual( initialState );
    expect(authSlice.name).toBe('auth');
  });

  test('should run login.', () => {
    const state =authSlice.reducer( initialState, login( demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('should run logout without arguments.', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test('should run logout with arguments.', () => {
    const errorMessage = 'credentials are not correct';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    });
  });

  test('should run checkingCredentials.', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe('checking');
  });

});