import React, { createContext, useState } from 'react'
export const UserDataContext=createContext()


const UserContext = ({children}) => {

const [user, setUser] = useState({
    fullname:{
        firstname:'',
        lastname:'',
    },
    email:'',
    
})

  return (
    
        <UserDataContext.Provider value={{user,setUser}}>
            {children}    {/* Makes user & setUser available to all children */}
        </UserDataContext.Provider>
  
  )
}

export default UserContext