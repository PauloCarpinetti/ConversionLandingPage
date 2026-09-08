import type { LucideIcon } from "lucide-react";

/** Item exibido no accordion do FAQ (ver data-model.md). */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** Tratamento oferecido pela clínica, exibido na seção de Serviços. */
export type Service = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

/** Motivo para escolher a clínica, exibido na seção de Diferenciais. */
export type Differential = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Depoimento de paciente exibido no carrossel (ver data-model.md). */
export type Testimonial = {
  id: string;
  author: string;
  text: string;
  rating?: number;
};
