import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config.jsx';
import App from './App.jsx';
import AuthRoute from './AuthRoute.jsx';

export default function MainNavigation() {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    return (
        <>
            <App />
        </>
    )
}
