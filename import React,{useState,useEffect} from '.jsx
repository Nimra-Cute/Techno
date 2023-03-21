import React,{useState,useEffect} from 'react';
import {Button, TextField, Typography, Stack} from '@mui/material';
import {auth} from '../config/firebase';
import {signOut} from 'firebase/auth';
import { onAuthStateChanged , updateEmail,  deleteUser} from 'firebase/auth';

const Home = () => {

  const[isLoggedIn,setIsLoggedIn] = useState(true);
  const[email, setEmail] = useState("");
  const[value,setValue] = useState("");
  const[user,setUser] = useState("");
  


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setValue(user);
        setIsLoggedIn(true);
        console.log(user)
      } else {
       console.log("user is logged out");
       setIsLoggedIn(false);
      }
    });
    
  })
    const handleSignOut = () =>{
        signOut(auth)
        .then((res) => {
          alert("user signout Successfully");
          setIsLoggedIn(false);
          }).catch((error) => {
            console.log(error);
          });
    }
    const handleChange = (e) =>{
      setEmail(e.target.value);
      setValue(e.target.value);
      
    }

   
    const handleUpdateEmail = () =>{
      updateEmail(auth.currentUser, email).then(()=>{

        setValue("");
        setUser(email)
  
        
        console.log("Email Update Successfully");
      }).catch((error)=>{
        console.log(error);
      })}

  const handleDelete = ()=>{
    deleteUser(auth.currentUser).then(() => {
     console.log("User Delete successfuly")
    }).catch((error) => {
    console.log(error)
    });
    
  }
  
  return (
   <>
   {
    isLoggedIn?
    <>
   <Stack mt={3}>
    <Typography variant='p'>{value.email}</Typography>
    <Typography>{value.displayName}</Typography>
    <Button varient="contained" sx={{width: "200px"}} onClick={handleSignOut}>signout</Button>
    <TextField  sx={{width:300}} variant='outlined' placeholder='Enter email...' onChange={handleChange}>Update Email</TextField>
    <Button  onClick={handleUpdateEmail}>Update Email</Button>
    <Button variant='contained' onClick={handleDelete}>Delete User</Button>
    </Stack>
    </> : <Typography variant='h3'>This is home page</Typography>  
  
}
</>
  )
}


export default Home;