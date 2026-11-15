import Modal from '../../components/Modal'
import CalibrationDetails from './CalibrationDetails'

export default function CalibrationDetailsModal({ onClose, item }) {
  return (
    <>
      <Modal open onClose={onClose} title="Calibration details" size="xl">
        <CalibrationDetails data={item} />
      </Modal>
    </>
  )
}
