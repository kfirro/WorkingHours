import "firebase/analytics";
import {auth} from "../index";

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
export function logOut() {
    auth.signOut().then(() => {
        return true;
    }).catch(function (error) {
        console.log(`Logout failed: ${error}`);
        return false;
    });
}