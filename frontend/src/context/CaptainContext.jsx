import React,{useState,createContext}from 'react'



// Provide a default value that matches your state structure
export const CaptainDataContext = createContext({
  captain: {
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      type: ''
    }
  },
  setCaptain: () => {} // Provide a no-op function as default
})

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      type: ''
    }
  })

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext








// const CaptainContext = ({children}) => {
//  const [captain, setCaptain] = useState({
//     fullname:{
//         firstname:'',
//         lastname:'',
//     },
//     email:'',
//    vehicle:{
//     color:'',
//     plate:'',
//     capacity:'',
//   type:''
//   }
// })

//   return (
    
//         <CaptainDataContext.Provider value={{captain,setCaptain}}>
//             {children}    {/* Makes captain & setCaptain available to all children */}
//         </CaptainDataContext.Provider>
  
//   )
// }

// // export default CaptainContext