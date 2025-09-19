import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showBackground?: boolean // false par défaut - pas d'arrière-plan
}

export function Logo({ size = 'md', className, showBackground = false }: LogoProps) {
  const containerClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  }

  const imageSize = {
    sm: 32,
    md: 48,
    lg: 64
  }

  if (showBackground) {
    return (
      <div className={cn(
        'bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center',
        containerClasses[size],
        className
      )}>
        <Image
          src="/images/logozypp.png"
          alt="Zypp Logo"
          width={imageSize[size]}
          height={imageSize[size]}
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <Image
      src="/images/logozypp.png"
      alt="Zypp Logo"
      width={imageSize[size]}
      height={imageSize[size]}
      className={cn('object-contain', containerClasses[size], className)}
    />
  )
}