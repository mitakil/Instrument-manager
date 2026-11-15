import Users from './User.js'
import Instruments from './Instrument.js'
import Comments from './Comment.js'
import SubComments from './SubComment.js'
import QcChecks from './QcChecks.js'
import Calibrations from './Calibration.js'

Users.hasMany(Comments, { foreignKey: 'user_id' })
Comments.belongsTo(Users, { foreignKey: 'user_id' })

Instruments.hasMany(Comments, { foreignKey: 'instrument_id' })
Comments.belongsTo(Instruments, { foreignKey: 'instrument_id' })

Comments.hasMany(SubComments, { foreignKey: 'comment_id' })
SubComments.belongsTo(Comments, { foreignKey: 'comment_id' })
SubComments.belongsTo(Users, { foreignKey: 'user_id' })

Instruments.hasMany(SubComments, { foreignKey: 'instrument_id' })
SubComments.belongsTo(Instruments, { foreignKey: 'instrument_id' })

QcChecks.belongsTo(Instruments, { foreignKey: 'instrument_id' })

Instruments.hasMany(Calibrations, { foreignKey: 'instrument_id' })
Calibrations.belongsTo(Instruments, { foreignKey: 'instrument_id' })

const syncModels = async () => {
  Users.sync({ alter: true })
  Comments.sync({ alter: true })
  Instruments.sync({ alter: true })
  SubComments.sync({ alter: true })
  QcChecks.sync({ alter: true })
  Calibrations.sync({ alter: true })
}

syncModels()

export { Users, Instruments, Comments, SubComments, Calibrations }
