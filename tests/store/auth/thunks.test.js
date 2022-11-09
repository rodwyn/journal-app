import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignin, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotes } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe('Testing auth thunks.', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should invoke checkingAuthentication', async() => {

    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  });

  test('should invoke startGoogleSignin sucessfully.', async() => {
    const loginData = { ok: true, ...demoUser};
    await singInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignin()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); 
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should invoke startGoogleSignin unsucessfully.', async() => {
    const loginData = { ok: false, errorMessage: 'A Google error.' };
    await singInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignin()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    // expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );
  });

  test('should invoke startLoginWithEmailPassword correctly.', async() => {
    const loginData = { ok: true, ...demoUser};
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // expect(dispatch).toHaveBeenCalledWith(login( loginData ));
  });

  test('should invoke startLogout correctly.', async() => {
    await startLogout()(dispatch);

    expect( logoutFirebase).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotes());
    // expect( dispatch ).toHaveBeenCalledWith( logout());
  });
});