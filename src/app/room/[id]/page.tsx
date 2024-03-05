'use client'

import { fireStoreDB } from '@/config/firebaseConfig'
import useAuth from '@/context/AuthContext'
import { IFeedback, IFeedbackType, IRoom } from '@/lib/types'
import { Alert, Button, ButtonGroup, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import { FirebaseError } from 'firebase/app'
import { collection, doc, documentId, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

type Props = {
  params: {
    id: string
  }
}

const feedbackTypes: IFeedbackType[] = ['open', 'improve', 'keep', 'stop', 'vote', 'complete']
const mutableFeedbackTypes = ['improve', 'keep', 'stop']

function Page({ params }: Props) {
  const { id } = params
  const { isAdmin, user } = useAuth()
  const [textValue, setTextValue] = useState<string>('')
  const [feedbackType, setFeedbackType] = useState<IFeedbackType>('open');
  const [room, setRoom] = useState<IRoom | undefined>(undefined);
  const [availableVotes, setAvailableVotes] = useState(() => {
    const storedVotes = localStorage.getItem('available_votes');
    return storedVotes ? parseInt(storedVotes, 10) : 3; // Assuming 3 votes initially
  });

  const qry = query(collection(fireStoreDB, 'room'), where(documentId(), '==', id))

  useEffect(() => {
    // Step 2: Update localStorage whenever the state changes
    localStorage.setItem('available_votes', availableVotes.toString());
  }, [availableVotes]);

  const feedbacks = useMemo(() => {
    if (!room) return []

    if (!mutableFeedbackTypes.includes(feedbackType)) {
      if (feedbackType === 'complete') {
        //accenting by height votes
        const accentingFeedback = room.feedbacks.sort((fb, fb2) => fb2.votes - fb.votes)
        console.log('accentingFeedback', accentingFeedback)
        return accentingFeedback;
      }


      return room.feedbacks
    }

    const type = feedbackType as 'improve' | 'keep' | 'stop'
    return room.feedbacks.filter(fb => fb.type === type)
  }, [feedbackType, room])

  useEffect(() => {
    console.log({ id })
    if (!id || id === '') return

    const unsubscribe = onSnapshot(qry, (snap) => {
      console.log('snap-data:', snap.docChanges().map(d => d.doc.data()))
      const dd = snap.docChanges().map(d => d.doc.data())
      if (dd.length < 1) return
      const dd0 = dd[0] as IRoom

      const room: IRoom = {
        ...dd0,
        id,
      }

      setRoom(room)
      setFeedbackType(room.status)
    }, (err: FirebaseError) => {
      console.log('err:', err.message)
    });

    return () => unsubscribe()
  }, [])

  const addFeedbackItem = (val: string) => {
    if (!val || val === '' || !room) return
    console.log('val: ', val)

    const feedbackCount = user ? room.feedbacks.filter(fb => fb.type === feedbackType && fb.createdBy === user.email) : []

    if (feedbackCount && feedbackCount.length >= 3) {
      alert("You can't enter more than 3")
      return;
    }

    const feedback: IFeedback = {
      id: nanoid(),
      type: feedbackType as IFeedback['type'],
      createdBy: (user && user.email) || '',
      value: val,
      votes: 0
    }

    setDoc(doc(fireStoreDB, 'room', id), {
      ...room,
      feedbacks: [...room.feedbacks, feedback],
    }).then(() => {
      setTextValue('')
    });
  }

  const addVote = (feedbackId: string) => {
    if (!room) return;
    if (availableVotes <= 0) {
      alert("You have no votes left to vote!!!")
      return;
    }

    const foundFeedback = feedbacks.find((fb) => fb.id === feedbackId)
    if (!foundFeedback) return;

    foundFeedback.votes += 1;
    setAvailableVotes((prv) => prv - 1);

    setDoc(doc(fireStoreDB, 'room', id), {
      ...room,
      feedbacks: [foundFeedback, ...room.feedbacks.filter(fb => fb.id !== feedbackId)],
    })
  }

  return (
    <Paper elevation={3} sx={{ width: 'fit-content', my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      page: {params.id} <br />
      isAdmin: {JSON.stringify(isAdmin)} <br />
      status: {feedbackType} <br />
      email: {user && user.email}

      {/** Action control */}
      <Grid container spacing={2} sx={{ width: '80vw' }}>
        {isAdmin && <Grid item xs={12}>
          <ButtonGroup aria-label="Basic button group">
            {feedbackTypes.map((va, index) =>
              <Button
                key={index}
                onClick={() => {
                  setDoc(doc(fireStoreDB, 'room', id), {
                    ...room,
                    status: va
                  })
                }}
                variant={va === feedbackType ? 'contained' : 'outlined'}>
                {va.toLocaleUpperCase()}
              </Button>)}
          </ButtonGroup>
        </Grid>}

        <Grid item xs={12}>
          {/** Feedback items */}
          {
            feedbacks.map((fb, index) => (
              <Alert icon={<></>} key={index} sx={{ mb: 1 }} severity={fb.type === 'improve' ? 'info' : fb.type === 'keep' ? 'success' : 'error'}>
                {/* <Badge badgeContent={2}> */}
                <Typography variant='h5'>
                  {fb.value}
                </Typography>
                <Typography variant='caption'>
                  {fb.createdBy} <br />
                  vote: {fb.votes} <br />

                  {feedbackType === 'vote' && <IconButton onClick={() => {
                    addVote(fb.id,)
                  }} size='small'>
                    <KeyboardDoubleArrowUpIcon />
                  </IconButton>}

                </Typography>
                {/* </Badge> */}
              </Alert>
            ))
          }
        </Grid>

        {['improve', 'keep', 'stop'].includes(feedbackType) &&
          <> <Grid item xs={12} md={8} >
            <TextField fullWidth value={textValue} onChange={(event) => {
              setTextValue(event.target.value)
            }} />
          </Grid>

            <Grid item xs={12} md={4}>
              <Button variant='contained' onClick={() => addFeedbackItem(textValue)} fullWidth size="large">
                Add feedback
              </Button>
            </Grid>
          </>}
      </Grid>
    </Paper>
  )
}

export default Page