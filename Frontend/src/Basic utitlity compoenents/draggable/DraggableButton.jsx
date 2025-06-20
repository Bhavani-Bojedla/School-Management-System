import React, { useContext } from 'react'
import Draggable from 'react-draggable';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';

export default function DraggableButton() {
      const { dark, modeChange } = useContext(AuthContext);

  return (
    <div>
    
      <Draggable>
          <Button sx={{position:"fixed",top:'13px',right:'20px',background:"transparent",zIndex:'99999'}} onClick={modeChange}>
             {dark?<DarkModeIcon sx={{color:'black'}}/>:<LightModeIcon sx={{color:'white'}}/>}
          </Button>
      </Draggable>
    </div>
  )
}
