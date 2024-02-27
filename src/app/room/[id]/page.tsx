import React from 'react'

type Props = {
  params: {
    id: string
  }
}

function page({params}: Props) {
  return (
    <div>page: {params.id}</div>
  )
}

export default page
