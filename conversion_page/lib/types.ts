/** Item exibido no accordion do FAQ (ver data-model.md). */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** Depoimento de paciente exibido no carrossel (ver data-model.md). */
export type Testimonial = {
  id: string;
  author: string;
  text: string;
  rating?: number;
};
