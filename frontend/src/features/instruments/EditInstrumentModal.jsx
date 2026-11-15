import { useState } from 'react'

import Modal from '../../components/Modal'
import Button from '../../components/Button'
import FormInput from '../../components/FormInput'
import FormRadioInput from '../../components/FormRadioInput'
import FormSelect from '../../components/FormSelect'
import { calibrationFrequencies } from './constants'
import { patchInstrument } from './instrumentsService'

export default function EditInstrumentModal({ data, id, onClose, onUpdate }) {
  const initialValues = {
    name: data.name ?? '',
    group: data.group ?? '',
    asset_id: data.asset_id ?? '',
    instrument_location: data.instrument_location ?? '',
    manufacturer: data.manufacturer ?? '',
    serial: data.serial ?? '',
    model: data.model ?? '',
    software_version: data.software_version ?? '',
    software: data.software ?? '',
    calibration_frequency: data.calibration_frequency ?? '',
    instrument_status: data.instrument_status ?? '',
  }
  const [name, setName] = useState(initialValues.name)
  const [group, setGroup] = useState(initialValues.group)
  const [assetId, setAssetId] = useState(initialValues.asset_id)
  const [location, setLocation] = useState(initialValues.instrument_location)
  const [manufacturer, setManufacturer] = useState(initialValues.manufacturer)
  const [serialNumber, setSerialNumber] = useState(initialValues.serial)
  const [model, setModel] = useState(initialValues.model)
  const [softwareVersion, setSoftwareVersion] = useState(initialValues.software_version)
  const [software, setSoftware] = useState(initialValues.software)
  const [calibrationFrequency, setCalibrationFrequency] = useState(
    initialValues.calibration_frequency
  )
  const [usageStatus, setUsageStatus] = useState(initialValues.instrument_status)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const hasChangedInformation = [
    name !== initialValues.name,
    group !== initialValues.group,
    assetId !== initialValues.asset_id,
    location !== initialValues.instrument_location,
    manufacturer !== initialValues.manufacturer,
    serialNumber !== initialValues.serial,
    model !== initialValues.model,
    software !== initialValues.software,
    softwareVersion !== initialValues.software_version,
    calibrationFrequency !== initialValues.calibration_frequency,
    usageStatus !== initialValues.instrument_status,
  ].some((value) => value === true)

  const requestClose = () => {
    if (hasChangedInformation) setConfirmOpen(true)
    else onClose()
  }

  const formFormat = 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-4 text-sm'

  const emptyToNull = (obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value === '' ? null : value])
    )

  const handleSubmit = async () => {
    const data = {
      name: name,
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

    const payload = Object.fromEntries(
      Object.entries(data)
        .filter(([key, value]) => value !== initialValues[key])
        .map(([key, value]) => [key, value === '' ? null : value])
    )

    setSaving(true)
    setError(null)
    try {
      await patchInstrument(id, emptyToNull(payload))
      onUpdate?.()
      onClose()
    } catch (error) {
      setError(error.response?.data?.error ?? 'Failed to add instrument')
    } finally {
      setSaving(false)
    }
  }
  return (
    <>
      <Modal
        open
        onClose={onClose}
        onCancel={requestClose}
        title="Edit instrument details"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-500 mb-4">
            Modify instrument details.
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
        <p className="text-sm text-gray-600">The information you changed will be lost.</p>
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
