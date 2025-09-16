import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine et optimise les classes Tailwind CSS
 * Évite les conflits de classes et merge intelligemment
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Délai d'attente asynchrone
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Génère un ID unique
 */
export const generateId = (): string => 
  Math.random().toString(36).substring(2, 15)

/**
 * Format les URLs
 */
export const formatUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

/**
 * Vérifie si on est côté client
 */
export const isClient = (): boolean => typeof window !== 'undefined'

/**
 * Smooth scroll vers un élément
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  if (!isClient()) return
  
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}