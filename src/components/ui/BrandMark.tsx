import Image from "next/image";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/** Decorative MATRKA emblem. The adjacent wordmark carries the accessible name. */
export function BrandMark({ size = 28, className, priority = false }: BrandMarkProps) {
  return (
    <Image
      src="/brand/matrka-emblem.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn("block h-auto w-auto shrink-0", className)}
    />
  );
}
