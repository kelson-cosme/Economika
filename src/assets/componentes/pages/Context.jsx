// import { createContext } from 'react';

// const UserContext = createContext({});

// export default UserContext;


import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    return (
        <>
            {children}
        </>
    );
};

export default UserContext;
