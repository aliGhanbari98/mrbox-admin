const statuses = {
  addPromotion: [
    { label: 'Active', value: 'active' },
    { label: 'Disable', value: 'disable' },
  ],
  product: [
    { label: 'Draft', value: 'draft' },
    {
      label: 'Waiting for admin approval',
      value: 'waiting_for_admin_approval',
    },
    { label: 'Published', value: 'published' },
    {
      label: 'Rejected',
      value: 'rejected',
    },
  ],
  vendor: [
    { label: 'Suspend', value: 'suspend' },
    {
      label: 'Waiting for admin approval',
      value: 'waiting_for_admin_approval',
    },
    { label: 'Approved', value: 'approved' },
    {
      label: 'Rejected',
      value: 'rejected',
    },
  ],
}

export default statuses
