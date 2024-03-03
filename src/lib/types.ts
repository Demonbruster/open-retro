export interface IFeedback {
  value: string
  votes: number
  createdBy: string
}

export interface IRoom {
  id: string
  title: string
  description?: string
  createdAt: Date
  feedbacks: {
    improve: IFeedback[]
    keep: IFeedback[]
    stop: IFeedback[]
  }
}