import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export function FileUploader({ file, onChange }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = () => setIsDragging(true)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    onChange(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false)
    }
  }

  const handleRemoveFile = (e) => {
    e.preventDefault()
    onChange(null)
  }

  const hasItem = file !== null ? file : null

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{
        border: '1px solid #ccc',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: isDragging ? '#f0f8ff' : '#fff',
      }}
    >
      <ul className="items-center">
        {hasItem ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-700">
              {file.name} ({(file.size / 1024).toFixed(0)} kB)
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              aria-label={`Remove ${file.name}`}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-sm">Drag and drop a PDF to upload</p>
            <Upload aria-hidden="true" />
          </div>
        )}
      </ul>
    </div>
  )
}
