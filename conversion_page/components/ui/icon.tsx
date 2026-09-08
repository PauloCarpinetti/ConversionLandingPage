import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = ComponentProps<LucideIcon> & {
  icon: LucideIcon;
};

/**
 * Wrapper fino sobre os ícones do lucide-react: aplica tamanho/traço padrão
 * consistentes e mescla `className` via `cn()` (FR-001, FR-002).
 * Uso: <Icon icon={MessageCircle} className="text-primary" />
 */
export function Icon({
  icon: IconComponent,
  className,
  size = 20,
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
