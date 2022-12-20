import { NotificationManager } from 'react-notifications';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

export const back_end = "https://sportify-hci.ew.r.appspot.com/"
//export const back_end = "http://0.0.0.0:4000"

export const login = async (email, pwd, data, navigate) => {
    let user = null
    try {
        user = await signInWithEmailAndPassword(getAuth(), email, pwd)
        notify("success", "Success!", "You are successfully logged in!")
        if (data.exists() && data.data().sports !== null) {
            navigate("/recommendations", { state: { preferences: data.data().sports } })
        } else {
            navigate("/select-preferences")
        }
    } catch (error) {
        console.log("error.code: ", error)
        if (error.code === "auth/user-not-found") {
            try {
                user = await createUserWithEmailAndPassword(getAuth(), email, pwd);
                notify('info', "User doesn't exist!", "Creating new user...")
                if (data.exists() && data.data().sports !== null) {
                    navigate("/recommendations", { state: { preferences: data.data().sports } })
                } else {
                    navigate("/select-preferences")
                }
            } catch (err2) {
                notify("error", "Error", err2.code)
            }
        } else {
            notify("error", "Error", error.code)
        }
    }

    console.log("User:", user)
    return user;
}

export const notify = (type, title, body, time = 2000) => {
    switch (type) {
        case 'info':
            console.log("Info...")
            NotificationManager.info(body, title, time);
            break;
        case 'success':
            NotificationManager.success(body, title, time);
            break;
        case 'warning':
            NotificationManager.warning(body, title, time);
            break;
        case 'error':
            NotificationManager.error(body, title, time);
            break;
    }
};
