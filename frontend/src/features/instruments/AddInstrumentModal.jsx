import { useState } from 'react'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import { calibrationFrequencies } from './constants'
import FormSelect from '../../components/FormSelect'
import FormRadioInput from '../../components/FormRadioInput'
import { postInstrument } from './instrumentsService'
import Modal from '../../components/Modal'

export default function AddInstrumentModal({ onClose, onCreated }) {
  const [name, setName] = useState('')
  const [group, setGroup] = useState('')
  const [assetId, setAssetId] = useState('')
  const [location, setLocation] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [model, setModel] = useState('')
  const [softwareVersion, setSoftwareVersion] = useState('')
  const [software, setSoftware] = useState('')
  const [calibrationFrequency, setCalibrationFrequency] = useState(12)
  const [usageStatus, setUsageStatus] = useState('out_of_service')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const formFormat = 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-4 text-sm'

  const hasInformation = [
    name,
    group,
    assetId,
    location,
    manufacturer,
    serialNumber,
    model,
    software,
    softwareVersion,
  ].some((value) => value.trim() !== '')

  const requestClose = () => {
    if (hasInformation) setConfirmOpen(true)
    else onClose()
  }

  const handleSubmit = async () => {
    if (!hasInformation || saving) return

    const data = {
      name,
      group,
      asset_id: assetId,
      instrument_location: location,
      manufacturer,
      serial: serialNumber,
      model,
      software,
      software_version: softwareVersion,
      calibration_frequency: calibrationFrequency,
      instrument_status: usageStatus,
    }

    setSaving(true)
    setError(null)
    try {
      await postInstrument(data)
      onCreated()
      onClose()
    } catch (error) {
      setError(error.response?.data?.error ?? 'Failed to add instrument')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Modal open onClose={onClose} onCancel={requestClose} title="Add instrument" size="lg">
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-500 mb-4">
            Fill the instrument details below.
            <br />
            Click <b>Cancel</b> or press <b>Esc</b> to close this dialog wihtout saving any changes.
          </p>

          <legend className="text-lg text-gray-900">Laboratory identification</legend>
          <p id="general-help" className="mb-3 text-sm text-gray-500">
            Internal name, group and ID defined by your laboratory.
          </p>
          <div className={formFormat}>
            <FormInput
              label="Name"
              type="text"
              placeholder="HPLC"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              label="Group"
              type="text"
              placeholder="Analytical"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <FormInput
              label="Asset ID"
              type="text"
              placeholder="IN-021"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
            />

            <FormInput
              label="Location"
              type="text"
              placeholder="Room 101"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <legend className="text-lg text-gray-900">Manufacturer details</legend>
          <p id="general-help" className="mb-3 text-sm text-gray-500">
            Manufacturer and serial numbers as shown on nameplate.
          </p>
          <div className={formFormat}>
            <FormInput
              label="Manufacturer"
              type="text"
              //placeholder=""
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
            <FormInput
              label="Serial number"
              type="text"
              //placeholder="e.g. 'Analytical'"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
            <FormInput
              label="Model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <FormInput
              label="Software"
              type="text"
              //placeholder="v1.2.3"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
            />
            <FormInput
              label="Software version"
              type="text"
              //placeholder="v1.2.3"
              value={softwareVersion}
              onChange={(e) => setSoftwareVersion(e.target.value)}
            />
          </div>

          <legend className="text-lg text-gray-900">Quality details</legend>
          <p id="general-help" className="mb-3 text-sm text-gray-500">
            Calibrations frequency, instrument status and other quality related information.
          </p>
          <div className={formFormat}>
            <FormSelect
              label="Calibration interval"
              options={calibrationFrequencies}
              value={calibrationFrequency}
              onChange={(e) => setCalibrationFrequency(Number(e.target.value))}
            />
          </div>
          <FormRadioInput
            label="Status"
            options={[
              { value: 'in_use', label: 'In use' },
              { value: 'out_of_service', label: 'Out of service' },
              { value: 'retired', label: 'Retired' },
            ]}
            name="usage_status"
            value={usageStatus}
            onChange={(value) => setUsageStatus(value)}
          />
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
