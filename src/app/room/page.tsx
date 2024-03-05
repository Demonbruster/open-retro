'use client'

import useGlobalCtx from '@/context/GlobalContext'
import { IRoom } from '@/lib/types'
import { Alert, Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

function Rooms() {
  const router = useRouter();
  const { rooms } = useGlobalCtx();

  const handleRoute = (id: string) => {
    router.push('/room/' + id)
  }

  return (
    <Box sx={{p: 2}}>
      <Button sx={{my: 1}} variant='contained' onClick={()=>{router.push('/room/create')}}>
        Create new
      </Button> <br/>
      List of Rooms:
      {rooms.map((room, index) => <Item key={index} room={room} onClick={handleRoute} />)}
    </Box>
  )
}

const Item = ({ room, onClick }: { room: IRoom, onClick: (id: string) => void }) => 
<Alert sx={{ mb: 1 }} icon={<></>} onClick={() => onClick(room.id)} >
  <Typography variant='h5'>
    {room.title}
  </Typography>
  {Boolean(room.description) && <Typography variant='caption'>
    {room.description}
  </Typography>}
</Alert>

export default Rooms