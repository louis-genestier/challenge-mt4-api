import { Challenge, Question } from '@prisma/client'

import { Shell } from 'shared/utils/shell/shell'
import { ChallengeRepo } from 'modules/challenges/repos/challenge'
import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'
import { InstanceController } from 'modules/instances/controllers/instance'
import { GradeRepo } from 'modules/grades/repos/grade'

export class ChallengeController {
  private readonly challengeRepo: ChallengeRepo
  private readonly gradeRepo: GradeRepo
  private readonly instanceController: InstanceController

  constructor() {
    this.challengeRepo = new ChallengeRepo()
    this.instanceController = new InstanceController()
    this.gradeRepo = new GradeRepo()
  }

  async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeRepo.findAll()
    return challenges
  }

  async findById(
    id: number,
    includeQuestions = false,
  ): Promise<
    Challenge & {
      questions: Question[]
    }
  > {
    const challenge = await this.challengeRepo.findById(id, includeQuestions)

    if (!challenge)
      throw new ApiError(HttpErrorCode.NotFound, 'Challenge not found')

    return challenge
  }

  async close(id: number): Promise<Challenge> {
    const challenge = await this.challengeRepo.close(id)

    if (!challenge)
      throw new ApiError(HttpErrorCode.NotFound, 'Challenge not found')

    return challenge
  }

  async startChallenge(
    challengeId: number,
    studentId: number,
  ): Promise<object> {
    const shell = new Shell()
    const instance = await this.instanceController.getInstance(studentId)
    const challenge = await this.findById(challengeId, true)

    let lastQuestion: Question = challenge.questions[0]
    let currentGrade = 0

    for (const question of challenge.questions) {
      lastQuestion = question

      const res = await shell.exec(
        {
          host: instance?.ip,
          username: instance?.user,
        },
        question.command_to_exec,
      )

      if (res.stdout !== question.expected_output) break

      currentGrade += question.points
    }

    const grade = await this.gradeRepo.save({
      grade: currentGrade,
      student_id: studentId,
      challenge_id: challengeId,
      questionId: lastQuestion.id,
    })

    return {
      grade: grade.grade,
      question: lastQuestion,
    }
  }
}
