import { useState } from 'react'

import Button from '../../components/Button'
import Modal from '../../components/Modal'
import FormInput from '../../components/FormInput'
import FormRadioInput from '../../components/FormRadioInput'

export default function QcCheckModal({ onDone, onClose }) {
  const [comment, setComment] = useState('')
  const [doneTimestamp, setDoneTimestamp] = useState('')
  const [qcCheckStatus, setQcCheckStatus] = useState('')

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [saving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    onDone?.()
  }

  const hasInformation = [doneTimestamp, qcCheckStatus].some((value) => value.trim() !== '')

  const requestClose = () => {
    if (hasInformation) setConfirmOpen(true)
    else onClose()
  }

  return (
    <>
      <Modal open onClose={onClose} title="Add QC check" size="lg">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Date done"
            value={doneTimestamp}
            onChange={(e) => setDoneTimestamp(e.target.value)}
            type="date"
          />
          <FormRadioInput
            label="QC Check:"
            options={[
              { value: 'OK', label: 'OK' },
              { value: 'NOK', label: 'NOK' },
            ]}
            name="qc_check_status"
            value={qcCheckStatus}
            onChange={(value) => setQcCheckStatus(value)}
          />
          <div>
            <label>Comment</label>
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
            />
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
