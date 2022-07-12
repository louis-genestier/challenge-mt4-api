import { PrismaClient } from '@prisma/client'

export const generateData = async (): Promise<void> => {
  const prisma = new PrismaClient()

  const promotion = await prisma.promotion.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: 'MT4 2021-2022',
    },
  })

  await prisma.challenge.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      is_open: true,
      name: 'Challenge shell',
      promotions: {
        connect: {
          id: promotion.id,
        },
      },
    },
  })

  await prisma.role.upsert({
    where: {
      id: 1
    },
    update: {},
    create: {
      name: 'admin'
    }
  })
}
