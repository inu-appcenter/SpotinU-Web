import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export type ToastItem = {
  id: number
  type: ToastType
  message: string
  duration?: number
}

type ToastState = {
  toasts: ToastItem[]
  add: (t: Omit<ToastItem, 'id'>) => number
  remove: (id: number) => void
}

let seq = 1

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  add: ({ type, message, duration = 2000 }) => {
    const id = seq++
    set((s) => ({ toasts: [...s.toasts, { id, type, message, duration }] }))
    // auto remove
    window.setTimeout(() => get().remove(id), duration)
    return id
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export const toast = {
  success: (msg: string, duration?: number) => useToastStore.getState().add({ type: 'success', message: msg, duration }),
  error: (msg: string, duration?: number) => useToastStore.getState().add({ type: 'error', message: msg, duration }),
  info: (msg: string, duration?: number) => useToastStore.getState().add({ type: 'info', message: msg, duration }),
}

