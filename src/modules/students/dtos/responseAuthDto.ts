import { Student } from '@prisma/client'

export interface responseAuthDto {
  student: Student,
  accessToken: string,
  refreshToken: string
}
