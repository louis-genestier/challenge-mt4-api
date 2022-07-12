declare namespace Express {
  export interface Request {
    user: {
      id: number
      email: string
      roles: { name: string }[]
    }
  }
}
