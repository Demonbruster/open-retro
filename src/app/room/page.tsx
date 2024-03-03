'use client'

import useGlobalCtx from '@/context/GlobalContext'
import { Alert, Typography } from '@mui/material'
import React from 'react'

function Rooms() {
const { rooms } = useGlobalCtx();

  return (
    <div>List of Rooms:
      {rooms.map((room, index) => <Item key={index} title={room.title} description={room.description} />)}
    </div>
  )
}

const Item = ({ title, description }: { title: string, description?: string }) => <Alert sx={{ mb: 1 }}>
  <Typography variant='h5'>
    {title}
  </Typography>
  {Boolean(description) && <Typography variant='caption'>
    {description}
  </Typography>}
</Alert>

export default Rooms