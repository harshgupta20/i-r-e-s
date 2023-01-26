import React from 'react';
import { auth } from '../../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Project = () => {
  
    const [user] = useAuthState(auth);

    return (
    <>

        User : {user?.displayName}
        UserEmail : {user?.email}
        userUid: {user?.uid}
        
    </>
  )
}

export default Project