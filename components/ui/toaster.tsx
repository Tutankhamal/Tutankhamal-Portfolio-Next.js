"use client"

import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[10000] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm p-4 rounded-lg shadow-lg border animate-slide-in-right ${
            toast.variant === "destructive"
              ? "bg-red-500 text-white border-red-600"
              : "bg-[#00ffff] text-[#0a0a0a] border-[#00ffff]"
          }`}
          style={{ boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
        >
          <div className="font-semibold">{toast.title}</div>
          {toast.description && <div className="text-sm opacity-90 mt-1">{toast.description}</div>}
          <button onClick={() => dismiss(toast.id)} className="absolute top-2 right-2 text-lg leading-none">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
