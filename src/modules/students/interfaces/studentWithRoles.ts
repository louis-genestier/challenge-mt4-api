import { Student } from '@prisma/client'

import { IRole } from 'shared/types/role'

export interface IStudentWithRoles extends Student {
  roles: IRole[]
}
