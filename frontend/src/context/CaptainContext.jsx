import React,{useState,createContext}from 'react'
export const CaptainDataContext=createContext()
const CaptainContext = ({children}) => {
 const [captain, setCaptain] = useState({
    fullname:{
        firstname:'',
        lastname:'',
    },
    email:'',
   vehicle:{
    color:'',
    plate:'',
    capacity:'',
  type:''
  }
})

  return (
    
        <CaptainDataContext.Provider value={{captain,setCaptain}}>
            {children}    {/* Makes captain & setCaptain available to all children */}
        </CaptainDataContext.Provider>
  
  )
}

export default CaptainContext