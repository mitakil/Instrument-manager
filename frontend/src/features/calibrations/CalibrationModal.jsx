import { useState } from 'react'

import Button from '../../components/Button'
import Modal from '../../components/Modal'
import FormInput from '../../components/FormInput'
import { FileUploader } from '../../components/FileUploader'
import { postCalibration } from './calibrationService'

export default function CalibrationModal({ onDone, onClose, instrumentId }) {
  const [comment, setComment] = useState('')
  const [performedBy, setPerformedBy] = useState('')
  const [file, setFile] = useState('')

  const today = () => new Date().toLocaleDateString('sv-SE')
  const [dateDone, setDateDone] = useState(today)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setError(null)

    try {
      await postCalibration(instrumentId, { dateDone, performedBy, comment, file })
      onDone?.()
      onClose()
    } catch (error) {
      setError('Failed to post calibration: ', error)
    } finally {
      setSaving(false)
    }
  }

  const hasInformation = [performedBy, comment].some((value) => value.trim() !== '')

  const requestClose = () => {
    if (hasInformation) setConfirmOpen(true)
    else onClose()
  }

  return (
    <>
      <Modal open onClose={onClose} onCancel={requestClose} title="Add calibration" size="lg">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Calibration date"
            //name="date"
            value={dateDone}
            onChange={(e) => setDateDone(e.target.value)}
            type="date"
          />
          <div>
            <label>Perfmormed by</label>
            <input
              type="text"
              value={performedBy}
              placeholder="e.g. company if external"
              onChange={(e) => setPerformedBy(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
            />
          </div>

          <div>
            <label>Comment</label>
            <textarea
              type="text"
              value={comment}
              placeholder="Additional comments, state at least if calibration criteria is met"
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
            />
          </div>
          <div>
            <label>Certificate (PDF)</label>
            <FileUploader file={file} onChange={setFile} />
          </div>
          <div className="flex gap-2">
            <div className="mt-2 flex gap-2">
              <Button variant="primary" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button onClick={requestClose}>Cancel</Button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Discard changes?"
        size="sm"
      >
        <p className="text-sm text-gray-600">The information you entered will be lost.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => setConfirmOpen(false)}>Keep editing</Button>
          <Button variant="primary" onClick={onClose}>
            Discard
          </Button>
        </div>
      </Modal>
    </>
  )
}
