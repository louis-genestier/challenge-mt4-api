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
      questions: {
        createMany: {
          data: [
            {
              title: 'Creer un fichier a avec comme contenu a',
              content:
                "Il faut créer à la racine de l'utilisateur un fichier a avec comme contenu la lettre a",
              command_to_exec: 'cat a',
              expected_output: 'a',
              points: 2,
            },
            {
              title: 'Creer un fichier a avec comme contenu b',
              content:
                "Il faut créer à la racine de l'utilisateur un fichier b avec comme contenu la lettre b",
              command_to_exec: 'cat b',
              expected_output: 'b',
              points: 2,
            },
            {
              title: 'Creer un fichier c avec comme contenu c',
              content:
                "Il faut créer à la racine de l'utilisateur un fichier c avec comme contenu la lettre c",
              command_to_exec: 'cat c',
              expected_output: 'c',
              points: 2,
            },
            {
              title: 'Creer un fichier d avec comme contenu d',
              content:
                "Il faut créer à la racine de l'utilisateur un fichier d avec comme contenu la lettre d",
              command_to_exec: 'cat d',
              expected_output: 'd',
              points: 2,
            },
            {
              title: 'Creer un fichier e avec comme contenu e',
              content:
                "Il faut créer à la racine de l'utilisateur un fichier e avec comme contenu la lettre e",
              command_to_exec: 'cat e',
              expected_output: 'e',
              points: 2,
            },
          ],
        },
      },
      promotions: {
        connect: {
          id: promotion.id,
        },
      },
    },
  })

  await prisma.student.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      first_name: 'louis',
      last_name: 'genestier',
      email: 'admin@mail.fr',
      // eslint-disable-next-line no-secrets/no-secrets
      password: '$2b$10$NMkj.U7fWzPPsxKqAuQZluODsb6z9iRjRombrMuF0SB2axvF29v3q', // = password
      roles: {
        create: {
          name: 'admin',
        },
      },
    },
  })
}
