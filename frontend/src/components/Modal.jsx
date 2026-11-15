import { useEffect, useRef } from 'react'

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export default function Modal({ open, onClose, onCancel, title, children, size = 'lg' }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onCancel={(e) => {
        if (e.target !== e.currentTarget) return
        if (onCancel) {
          e.preventDefault()
          onCancel()
        }
      }}
      aria-labelledby="modal-title"
      className={`w-full ${sizes[size]} rounded-lg p-6 backdrop:bg-black/40`}
    >
      <h1 id="modal-title" className="mb-4 text-lg font-semibold">
        {title}
      </h1>
      {children}
    </dialog>
  )
}
