import { CalendarCheck, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import type { Differential } from "@/lib/types";

export const differentials: Differential[] = [
  {
    id: "equipamentos-modernos",
    title: "Equipamentos Modernos",
    description: "Tecnologia atualizada para diagnósticos mais precisos e tratamentos mais rápidos.",
    icon: ShieldCheck,
  },
  {
    id: "atendimento-humanizado",
    title: "Atendimento Humanizado",
    description: "Equipe atenciosa, pronta para explicar cada etapa do seu tratamento com calma.",
    icon: HeartHandshake,
  },
  {
    id: "localizacao-facil",
    title: "Localização Fácil",
    description: "No centro da cidade, com estacionamento próximo e fácil acesso por transporte público.",
    icon: MapPin,
  },
  {
    id: "agilidade-no-agendamento",
    title: "Agilidade no Agendamento",
    description: "Marque sua consulta pelo WhatsApp e receba retorno rápido da nossa recepção.",
    icon: CalendarCheck,
  },
];
