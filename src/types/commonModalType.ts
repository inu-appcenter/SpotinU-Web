export interface CommonModalProps {
  isOpen: boolean
  title: string
  content?: string | React.ReactNode //
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
