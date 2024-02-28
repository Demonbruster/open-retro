'use client'

import useAuth from '@/context/AuthContext'
import { Button, ButtonGroup, Container, Grid, Paper, TextField } from '@mui/material'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

function Page({ params }: Props) {
  const { isAdmin } = useAuth()
  const [textValue, setTextValue] = React.useState<string>('')

  const addFeedbackItem = (val: string) => {
    if (!val || val === '') return

    console.log('val: ', val)
  }

  return (

    <Paper elevation={3} sx={{ width: 'fit-content', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      page: {params.id}

      {/** Action control */}
      <Grid container spacing={2} sx={{ width: '80vw' }}>
        <Grid item xs={12}>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>Add</Button>
            <Button>Keep</Button>
            <Button>Stop</Button>
            <Button>Vote</Button>
            <Button>Complete</Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          {/** Feedback items */}
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField fullWidth value={textValue} onChange={(event) => {
            setTextValue(event.target.value)
          }} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Button variant='contained' onClick={() => addFeedbackItem(textValue)} fullWidth size="large">
            Add feedback
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Page