import swal from 'sweetalert'

export const deleteItemAlert = (query, targetId, callback): void => {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, recovery will not be possible!',
    icon: 'warning',
    buttons: ['Cancel', 'Delete'],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      query(targetId).then(() => {
        swal('Successfully Deleted')
        callback()
      })
    }
  })
}

export const updateStatusAlert = (query, payload, callback): void => {
  swal({
    title: 'Are you sure?',
    icon: 'warning',
    buttons: ['Cancel', 'Update'],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      query(payload).then(() => {
        swal('Successfully Updated')
        callback()
      })
    }
  })
}

export const successAlert = (callback): void => {
  swal({
    icon: 'success',
    title: 'Done.',
  }).then((ok) => {
    if (ok) {
      const doc = document.getElementById('content-container')
      doc?.scrollTo({ top: 0, behavior: 'smooth' })
      if (callback) callback()
    }
  })
}

export const errorAlert = ({ message, detail }): void => {
  swal({
    icon: 'warning',
    title: message,
    text:
      typeof detail === 'string'
        ? detail
        : detail
            .map(({ loc }) => {
              return loc && loc[loc.length - 1]
            })
            .join(', '),
  })
}

export const comingSoonAlert = (): void => {
  swal({
    icon: 'info',
    title:
      'This section will be integrated and fully functional once the mobile applications work.',
  })
}
