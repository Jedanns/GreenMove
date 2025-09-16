import { Variants } from 'framer-motion'

// Animation de fade-in depuis le bas (style motion.dev)
export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 24 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 1.11, 0.81, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: 24,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

// Animation de scale sophistiquée
export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
}

// Animation de slide depuis la droite
export const slideInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 50 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}

// Animation staggered pour les listes
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// Animation de rotation élégante
export const rotateIn: Variants = {
  initial: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.9 
  },
  animate: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
}

// Animation de parallax simple
export const parallaxUp: Variants = {
  initial: { y: 0 },
  animate: { 
    y: -50,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

// Animation de hover sophistiquée pour boutons
export const buttonHover: Variants = {
  initial: { scale: 1 },
  whileHover: { 
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  whileTap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  }
}

// Animation de reveal de texte (style motion.dev)
export const textReveal: Variants = {
  initial: { 
    opacity: 0,
    y: 50
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}

// Animation de masque de chargement
export const loadingBar: Variants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}

// Animation de navigation mobile
export const mobileMenu: Variants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}

// Animation de modal
export const modalOverlay: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

export const modalContent: Variants = {
  closed: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1]
    }
  }
}