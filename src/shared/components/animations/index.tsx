import { motion } from "framer-motion"

// Animações simples e reutilizáveis
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const

// Configurações padrão de transição
export const transition = {
  duration: 0.3,
  ease: "easeOut",
} as const

// Hook para animações de viewport
export const viewportConfig = {
  once: true,
  margin: "-100px",
} as const

// Componente de FadeInSection simplificado
export interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeInSection({ 
  children, 
  className = "",
  delay = 0 
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Componente de StaggerContainer para animações em sequência
export interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Componente de StaggerItem para itens em sequência
export interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  index?: number
}

export function StaggerItem({ 
  children, 
  className = "",
  index = 0 
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}