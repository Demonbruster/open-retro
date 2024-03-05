import { Timestamp } from "firebase/firestore"

export interface IFeedback {
  id: string
  type: 'improve' | 'keep' | 'stop'
  value: string
  votes: number
  createdBy: string
}

export type IFeedbackType = 'open' | 'improve' | 'keep' | 'stop' | 'vote' | 'complete'

export interface IRoom {
  id: string
  title: string
  description?: string
  createdAt: Timestamp
  isOpenJoin: boolean
  status: IFeedbackType
  feedbacks: IFeedback[]
}