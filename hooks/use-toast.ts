"use client"

import { useState, useCallback } from "react"
import type { ToastActionElement } from "@/components/ui/toast"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
  action?: ToastActionElement
}

interface ToastOptions {
  title: string
  description?: string
  variant?: "default" | "destructive"
  action?: ToastActionElement
}

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((options: ToastOptions) => {
    const id = (++toastCount).toString()
    const newToast: Toast = {
      id,
      ...options,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
    }
  }, [])

  return {
    toast,
    toasts,
    dismiss: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
  }
}
