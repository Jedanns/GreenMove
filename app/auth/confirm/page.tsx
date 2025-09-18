'use client'

import { Suspense } from 'react'
import { Card } from '@/components/ui'
import ConfirmContent from './ConfirmContent'

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md">
        <Card className="p-8 text-center">
          <Suspense fallback={
            <div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          }>
            <ConfirmContent />
          </Suspense>
        </Card>
      </div>
    </div>
  )
}