"use client"

import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface PrimaryBTNProps {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  variant?: "default" | "outline" | "ghost"
}

function PrimaryBTN({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className,
  variant = "default",
}: PrimaryBTNProps) {
  const baseStyles = "w-full h-12 rounded-full font-semibold transition-all"
  
  const variants = {
    default: "bg-[#2A73EA] text-white hover:bg-[#2A73EA]/90",
    outline: "border-2 border-[#2A73EA] text-[#2A73EA] hover:bg-[#2A73EA]/10",
    ghost: "text-white hover:bg-white/10",
  }

  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], className)}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </ShadcnButton>
  )
}

export { PrimaryBTN }
