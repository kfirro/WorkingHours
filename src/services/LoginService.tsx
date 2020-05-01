import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

export function getUser(): firebase.User | undefined {
    return firebase.auth().currentUser ?? undefined;
}
export function isLoggedIn(): boolean {
    return getUser() ? true : false;
}
export async function logIn(email: string, password: string): Promise<string> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (auth) {
            console.log(`login success! ${auth.user}`);
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
    firebase.auth().signOut().then(() => {
        return true;
    }).catch(function (error) {
        console.log(`Logout failed: ${error}`);
        return false;
    });
}
// export default class LoginService {
//     private isLoggedIn: boolean;
//     private user: any;
//     constructor() {
//         this.isLoggedIn = false;
//         this.user = undefined;
//     }
//     getUser = (): any => {
//         var user = firebase.auth().currentUser;
//         if (user) {
//             this.user = user;
//             this.isLoggedIn = true;
//         }
//         return this.user ?? undefined;
//     }
//     logIn = (email: string, password: string): any => {        
//         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(`Can't login, Error Code: ${errorCode}, Error Message: ${errorMessage}`);
//           });
//         return this.getUser();
//     }
//     logOut = () => {   
//         firebase.auth().signOut().then(() => {
//             this.user = undefined;
//             this.isLoggedIn = false;
//             return true;
//         }).catch(function (error) {
//             console.log(`Logout failed: ${error}`);
//             return false;
//         });
//     }
// }