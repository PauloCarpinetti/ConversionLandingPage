import { Activity, Shield, Smile, Sparkles, Stethoscope } from "lucide-react";
import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "clareamento",
    name: "Clareamento Dental",
    description: "Deixe seu sorriso mais branco com segurança e acompanhamento profissional.",
    icon: Sparkles,
  },
  {
    id: "implantes",
    name: "Implantes Dentários",
    description: "Recupere dentes perdidos com implantes modernos e duradouros.",
    icon: Stethoscope,
  },
  {
    id: "ortodontia",
    name: "Ortodontia",
    description: "Aparelhos fixos e removíveis para alinhar seu sorriso em qualquer idade.",
    icon: Smile,
  },
  {
    id: "limpeza-prevencao",
    name: "Limpeza e Prevenção",
    description: "Consultas de rotina para manter a saúde bucal em dia e evitar problemas futuros.",
    icon: Shield,
  },
  {
    id: "tratamento-de-canal",
    name: "Tratamento de Canal",
    description: "Tratamento de canal moderno, com foco no seu conforto durante o procedimento.",
    icon: Activity,
  },
];
