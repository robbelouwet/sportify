import { NotificationManager } from 'react-notifications';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

export const user = null

export const login = async (email, pwd, navigate) => {
    try {
        await signInWithEmailAndPassword(getAuth(), email, pwd)
        //printInfo("Success", "Logged in successfully!")
        notify("success", "Success!", "You are successfully logged in!")
        navigate("/select-preferences")
    } catch (error) {
        console.log("error.code: ", error.code)
        if (error.code === "auth/user-not-found") {
            //printInfo("User doesn't exist!", "Creating new user...")
            const idk = notify('info', "User doesn't exist!", "Creating new user...")
            console.log("idk: ", idk)
            try {
                await createUserWithEmailAndPassword(getAuth(), email, pwd);
                navigate("/select-preferences")
            } catch (err2) {
                //printError(err2.code)
                notify("error", "Error", err2.code)
            }
        } else {
            notify("error", "Error", error.code)
        }
    }
}

export const notify = (type, title, body) => {
    switch (type) {
        case 'info':
            console.log("Info...")
            NotificationManager.info(body, title, 2000);
            break;
        case 'success':
            NotificationManager.success(body, title, 2000);
            break;
        case 'warning':
            NotificationManager.warning(body, title, 2000);
            break;
        case 'error':
            NotificationManager.error(body, title, 2000);
            break;
    }
};