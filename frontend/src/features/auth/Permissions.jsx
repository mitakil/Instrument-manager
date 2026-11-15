const permissions = [
  { action: 'Browse instruments', user: true, engineer: true, admin: true },
  { action: 'View instrument details', user: true, engineer: true, admin: true },
  { action: 'Add comment', user: true, engineer: true, admin: true },
  { action: 'Add instrument', user: false, engineer: true, admin: true },
  { action: 'Edit instrument', user: false, engineer: true, admin: true },
  { action: 'Add calibration', user: false, engineer: true, admin: true },
  { action: 'Manage users', user: false, engineer: false, admin: true },
  { action: 'Accept calibration', user: false, engineer: false, admin: true },
]

export default function PermissionMatrix() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-400 border-b border-gray-200">
          <th className="py-2">Action</th>
          <th className="text-center">User</th>
          <th className="text-center">Engineer</th>
          <th className="text-center">Admin</th>
        </tr>
      </thead>
      <tbody>
        {permissions.map((p) => (
          <tr key={p.action} className="border-b border-gray-100">
            <td className="py-2">{p.action}</td>
            <td className="text-center">{p.user ? '✓' : '—'}</td>
            <td className="text-center">{p.engineer ? '✓' : '—'}</td>
            <td className="text-center">{p.admin ? '✓' : '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
