export const getBadge = (status: string) => {
  switch (status) {
    case 'published':
    case 'Active':
      return 'success'
    case 'Inactive':
    case 'new_arrival':
    case 'draft':
      return 'secondary'
    case 'Pending':
    case 'waiting_for_admin_approval':
      return 'warning'
    case 'Banned':
    case 'rejected':
    case 'disabled':
      return 'danger'
    default:
      return 'primary'
  }
}
