import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { baseApi } from '../../../Environment';

export default function Attendee({classId,handleMessage,message}) {
    const [teachers,setTeachers]=useState([]);
    const [selectedTeacher,setSelectedTeacher]=useState("");
    const handleSubmit=async()=>{  
       try{
        if(selectedTeacher){

          const response=await axios.patch(`${baseApi}/class/update/${classId}`,{attendee:selectedTeacher})
          console.log(response,"submit attendee");
          handleMessage("Success in attendee save/update","success");
        }else{
            alert("Please select a teacher first.");
        }
       }catch(e){
         console.log(e)
       }
    }
    const fetchteachers=()=>{
        axios
          .get(`${baseApi}/teacher/fetch-with-query`, { params:{} })
          .then((res) => {
            setTeachers(res.data.teachers);
          })
          .catch((e) => {
            console.log("Error in fetching class.");
          });
    }
     const [attendee,setAttendee]=useState(null);

     const fetchClassDetails=async()=>{
       if(classId){
        try{
         const response=await axios.get(`${baseApi}/class/single/${classId}`);
         setAttendee(response.data.data.attendee?response.data.data.attendee:null);
         console.log("single class",response)
        }catch(e){
          console.log(e)
        }
       }
     } 
      
    useEffect(()=>{
        console.log("class id",classId)
        fetchteachers();
         fetchClassDetails();
    },[classId, message]);

  return (
    <div>
      <h1>Attendee</h1>

      <Box>
        {attendee && 
        <Box component={'div'} sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Typography variant='h5' >Attendee Teacher: </Typography>
            <Typography variant='h5'>{attendee.name}</Typography>

        </Box>
        }
        
         <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
                <InputLabel id="demo-simple-select-label">Teachers</InputLabel>
                <Select
                label="Select Teachers"
                value={selectedTeacher}
                onChange={(e) => {
                    setSelectedTeacher(e.target.value)
                }}
                >
                <MenuItem value="">Select Teacher</MenuItem>
                {teachers &&
                    teachers.map((item) => {
                    return (
                        <MenuItem key={item._id} value={item._id}>
                        {item.name}
                        </MenuItem>
                    );
                    })}
                </Select>
            </FormControl>
            
            <Button onClick={handleSubmit}>{attendee ? "Change Attandee":"Select Attendee" }</Button>
      </Box>
    </div>
  )
}
