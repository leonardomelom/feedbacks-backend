import { SubmitFeedbackService } from "./submit-feedback"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  {create:createFeedbackSpy},
  {sendMail: sendMailSpy}
)
describe('submit feedback', () => {
  it('should be able to submit feedback', async () => {
    
  await expect(submitFeedback.execute({
    type: 'BUG',
    comment: 'bug comment',
    screenshot: 'data:image/png;base64,wedwedqedqedqwedwqed'
  })).resolves.not.toThrow()

  expect(createFeedbackSpy).toHaveBeenCalled()
  expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be able to submit feedback whitout type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'bug comment',
      screenshot: 'data:image/png;base64,wedwedqedqedqwedwqed'
    })).resolves.toThrow()
    })
    it('should be able to submit feedback whitout comment', async () => {

      await expect(submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,wedwedqedqedqwedwqed'
      })).resolves.toThrow()
      })
      it('should be able to submit feedback whit an invalid screenshot', async () => {

        await expect(submitFeedback.execute({
          type: 'BUG',
          comment: 'ta tudo bugado',
          screenshot: 'test.jpeg'
        })).resolves.toThrow()
        })
})