'use client'

import { fireStoreDB } from '@/config/firebaseConfig'
import useGlobalCtx from '@/context/GlobalContext'
import { Query, collection, getDocs, getDocsFromCache, getDocsFromServer, query } from 'firebase/firestore'
import React, { useEffect } from 'react'

type Props = {}

function Rooms({ }: Props) {
  const { rooms } = useGlobalCtx();

  console.log('rooms: ', rooms)

  useEffect(() => {
    // getDocsFromServer(query(collection(fireStoreDB, 'room'))).then((res) => {
    //   const dd = res.docs.map(val => ({
    //     id: val.id,
    //     data: val.data()
    //    }))
    //    console.log('docs: => ', dd)
    //    res.docs
    //  })
  }, [])

  return (
    <div>Rooms</div>
  )
}

export default Rooms