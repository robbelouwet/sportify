import { NotificationManager } from 'react-notifications';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

export const login = async (email, pwd, navigate) => {
    try {
        const user = await signInWithEmailAndPassword(getAuth(), email, pwd)
        notify("success", "Success!", "You are successfully logged in!")
        navigate("/select-preferences")
        return user
    } catch (error) {
        console.log("error.code: ", error.code)
        if (error.code === "auth/user-not-found") {
            try {
                const user = await createUserWithEmailAndPassword(getAuth(), email, pwd);
                notify('info', "User doesn't exist!", "Creating new user...")
                navigate("/select-preferences")
                return user
            } catch (err2) {
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