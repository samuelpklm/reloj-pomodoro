import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import UpdateIcon from '@mui/icons-material/Update';

import './App.css'

function App() {
 const [session, setSession] = useState(25);
 const [breack, setBreack] = useState(5);
 const [minute, setMinute] = useState(25);
 const [segundos, setSegundos] = useState(0);
 const [estadoContador, setEstadoContador] = useState('initial');
 const [seccionOrBreak, setSeccionOrBreak] = useState('Session');
 const [menosMinuto, setMenosMinuto] = useState(false);

  useEffect(() => {

    if(estadoContador === 'started'){
      const interval = setInterval(() => {
        setSegundos((s) => {
        if(s <= 0){
          setMinute((m) => {
            if(m <= 0){
              cambioEstudio();
            } else{
            return m - 1
          }
          });
          return 59;
        }else{
          if(minute < 1){
            setMenosMinuto((m) => !m);
          }
          return  s - 1
        }
        });
      
     
      
      },1000);
      return () => clearInterval(interval);
    } 

  }, [estadoContador,seccionOrBreak,minute]);

  const cambioEstudio = () => {
    setMenosMinuto((m) => false);

    const audio = document.getElementById('beep');
    audio.play();

    if(seccionOrBreak === 'Session'){
      setSeccionOrBreak('Break');
      setMinute(breack);
      setSegundos(0);
    }else if(seccionOrBreak === 'Break'){
      setSeccionOrBreak('Session');
      setMinute(session);
      setSegundos(0);
    }
  }

  const handlestart = () => {
    setEstadoContador('started');
  };


  const handleStop = () => {
    setEstadoContador('stopped');
  }

  const incrementarSeccion = () => {
    if(estadoContador === 'initial'){
    setSession((s) => {
      setMinute(s + 1);
      return s + 1;
    }); 
  }
  }

  const decrementarSeccion = () => {
    if(estadoContador === 'initial'){
    setSession((s) => {
      setMinute(s - 1);
      return s - 1;
    }); 
  }
  }

  const incrementarBreack = () => {
    if(estadoContador === 'initial'){
    setBreack((s) => {
     
      return s + 1;
    }); 
  }
  }

  const decrementarBreack = () => {
    if(estadoContador === 'initial'){
    setBreack((s) => {
     
      return s - 1;
    }); 
  }
  }

  const establecerEstadoInitial = () => {
    setEstadoContador('initial');
    setMinute(session);
    setSegundos(0);
    setMenosMinuto((m) => false);
  }


  return (
    <>
      <Box display='flex' flexDirection='column' gap={1} alignItems='center' justifyContent='center' height='100vh'>
        <Typography variant='h4' color='white'>  25 + 5 Clock</Typography>
        <Box display='flex' gap={10}>
          <Box display='flex' flexDirection='column'>
            <Typography textAlign='center' variant='h5' color='white'> Break Length </Typography>
            <Box display='flex' justifyContent='center' gap={3}>
              <ArrowDownwardIcon onClick={() => breack <= 1 ? 0 : decrementarBreack()} sx={{color: 'white', cursor: 'pointer'}}/>
              <Typography variant='h6' color='white'> {breack} </Typography>
              <ArrowUpwardIcon onClick={() => incrementarBreack()} sx={{color: 'white', cursor: 'pointer'}}/>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography textAlign='center' variant='h5' color='white'> Session Length </Typography>
            <Box display='flex' justifyContent='center' gap={3}>
              <ArrowDownwardIcon onClick={() => session <= 1 ? 0 : decrementarSeccion()} sx={{color: 'white', cursor: 'pointer'}}/>
              <Typography variant='h6' color='white'> {session} </Typography>
              <ArrowUpwardIcon onClick={incrementarSeccion} sx={{color: 'white', cursor: 'pointer'}}/>
              
            </Box>
          </Box>
        </Box>
        <Box padding={3} display='flex' flexDirection='column' alignItems='center' borderRadius={10} border='5px solid #337066' height={150} width={300}>
          <Typography variant='h5' color='white'> {seccionOrBreak} </Typography>
          <Typography color={menosMinuto ? 'red' : 'white'} variant='h5'> {minute}:{segundos < 10 ? '0'+segundos: segundos} </Typography>
          <Box display='flex'>
          <PlayArrowIcon onClick={() => handlestart()} sx={{color: 'white', cursor: 'pointer'}}/>
          <PauseIcon onClick={() => handleStop()} sx={{color: 'white', cursor: 'pointer'}}/>
          <UpdateIcon onClick={() => establecerEstadoInitial()} sx={{color: 'white', cursor: 'pointer'}}/>
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </Box>
        </Box>
        
      </Box>
      
    </>
  )
}



export default App
