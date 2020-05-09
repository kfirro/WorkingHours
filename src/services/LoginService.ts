import "firebase/analytics";
import {auth, googleAuthProvider} from "../index";

export async function loginWithGmail(): Promise<string> {
    try {
        const user = await signInWithGmailPopup();
        console.log(user);
        return "OK";
    } catch (error) {
        console.log(error);
        return `${error.message}`;
    }
}

async function signInWithGmailPopup(): Promise<firebase.auth.UserCredential> {
    return auth.signInWithPopup(googleAuthProvider);
}

export async function logIn(email: string, password: string): Promise<string> {
    return auth.signInWithEmailAndPassword(email, password)
        .then(function (auth) {
            return "OK";
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            return `${errorMessage}`;
        });
}
export function logOut(): void {
    auth.signOut().then(() => {
        return true;
    }).catch(function (error) {
        console.log(`Logout failed: ${error}`);
        return false;
    });
}