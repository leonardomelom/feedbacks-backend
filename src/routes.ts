import express from 'express'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback';
import { NodeMailerMailSender } from './utils/nodemailer/nodemailer-mail-sender';
export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
 const { type, comment, screenshot} = req.body

 const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
 const nodemailerMailSender = new NodeMailerMailSender()
 const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository,
  nodemailerMailSender)

 await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  })

  
  return res.status(201).send()
})
