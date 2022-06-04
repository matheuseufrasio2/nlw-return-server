import { SubmitFeedbackService } from "./submit-feedback-service"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'data:image/png;base64test screenshot.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })
  
  it('should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'test comment',
      screenshot: 'data:image/png;base64test screenshot.jpg',
    })).rejects.toThrow();
  })
  
  it('should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64test screenshot.jpg',
    })).rejects.toThrow();
  })
  
  it('should not be able to submit a feedback with a invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'screenshot.jpg',
    })).rejects.toThrow();
  })
})