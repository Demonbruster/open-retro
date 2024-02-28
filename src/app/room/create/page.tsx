'use client'

import React, { useState } from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'

import { fireStoreDB } from '@/config/firebaseConfig'

interface IField {
  value: string
  error: string
  touched: boolean
}

interface IData {
  title: IField
  description?: IField
  createdAt: Date
}

interface IFeedback {
  value: string,
  vote: number,
}

const uniqID = nanoid();

const createNewRoom = async (data: IData) => await setDoc(doc(fireStoreDB, 'room', uniqID), {
  title: data.title.value,
  description: data.description?.value || '',
  status: 'open',
  isOpenJoin: true,
  createdAt: data.createdAt,
  feedbacks: {
    add:[],
    keep:[],
    stop:[],
  }
})

function Page() {
  const router = useRouter();
  const [data, setData] = useState<IData>({
    title: { value: '', error: '', touched: false },
    description: { value: '', error: '', touched: false },
    createdAt: new Date(),
  })

  const handleChange = (fieldName: keyof IData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let fieldValue = { ...data[fieldName] } as IField;
      fieldValue.value = e.target.value;
      fieldValue.error = ''; // Reset the error when the field is changed

      setData({
        ...data,
        [fieldName]: fieldValue,
      });
    };
  };

  const handleBlur = (fieldName: keyof IData) => () => {
    let fieldValue = { ...data[fieldName] } as IField
    fieldValue.touched = true;
    setData({
      ...data,
      [fieldName]: fieldValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Your validation logic goes here
    // For simplicity, let's assume a simple required validation for both title and description
    if (!data.title.value.trim()) {
      setData({
        ...data,
        title: { ...data.title, error: 'Title is required', touched: true },
      });
    }

    // If there are no errors, proceed with the submission logic
    if (!data.title.error) {
      // Perform your form submission logic here
      createNewRoom(data).then((res:unknown) => {
        router.push("/room/"+uniqID)
      })
      // console.log('Form submitted:', data);
    }
  };

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography variant="h6" gutterBottom>
        Create new retro
      </Typography>
      <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              value={data.title.value}
              onChange={handleChange('title')}
              label="Title"
              fullWidth
              onBlur={handleBlur('title')}
              helperText={data.title.error && data.title.touched ? data.title.error : ''}
              error={Boolean(data.title.error)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={data.description?.value || ""}
              onChange={handleChange('description')}
              label="Description"
              fullWidth
              onBlur={handleBlur('description')}
              helperText={data.description?.error && data.description?.touched ? data.description?.error : ''}
              error={Boolean(data.description?.error)} />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' type="submit"> Create </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Page;
