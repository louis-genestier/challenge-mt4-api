import Excel from 'exceljs'

import { IStudentGrade } from 'modules/promotions/interfaces/promotionsGrades'

export const createWorkbook = (grades: IStudentGrade[]) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Grades')

  const header: Partial<Excel.Column>[] = [
    {
      key: 'firstName',
      header: 'First name',
    },
    {
      key: 'lastName',
      header: 'Last name',
    },
    {
      key: 'grade',
      header: 'Grade',
    },
    {
      key: 'createdAt',
      header: 'Created at',
    },
  ]

  worksheet.columns = header

  grades.forEach((grade) =>
    worksheet.addRow({
      ...grade,
      firstName: grade.student.first_name,
      lastName: grade.student.last_name,
      createdAt: grade.created_at.toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris',
      }),
    }),
  )

  return workbook
}
