// Lets other components hand a question to the ChatBot, which is mounted once in the root layout.
export const ASK_TUTOR_EVENT = 'chaduvuko:ask-tutor'

export function askTutor(question: string) {
  window.dispatchEvent(new CustomEvent<string>(ASK_TUTOR_EVENT, { detail: question }))
}
