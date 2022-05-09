import { FeedbacksRepository } from "../repositories/feedbacks-respository";
import { MailAdapter } from "../utils/mail-sender";


interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}
export class SubmitFeedbackService {

  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailSender: MailAdapter
  ){}

  async execute(request: SubmitFeedbackServiceRequest){
    const { type, comment, screenshot} = request

    if(!type){
      throw new Error('type is required')
    }
    if ( screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }	

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailSender.sendMail({
      subject: 'Feedback do usuário',
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#222;">`,
        `<h3>Feedback do usuário</h3>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<p>Screenshot: ${screenshot}</p>`,
        `</div>`
      ].join('\n')
    })
}}