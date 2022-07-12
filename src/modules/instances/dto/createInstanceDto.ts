export interface createInstanceDto {
  ip: string
  user: string
}

export interface CreateInstanceWithStudentDto extends createInstanceDto {
  student_id: number
}
