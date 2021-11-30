import axios from 'axios'
import 'src/configs/axios'
import { errorAlert } from './alerts'

const refreshReq = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')

  return axios
    .post(
      '/auth/token/refresh',
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => console.log())
}

export const reqWrapper = (req) => (args, options = {}) => {
  return req(args, localStorage.getItem('accessToken'))
    .then(({ data }) => data.data)
    .catch((err) => {
      if (err.response) {
        console.log(err.response)
        errorAlert(err.response.data)
      }
      if (!err.response) throw err

      if (err.response.status === 404) {
        // console.error(err.response)
      } else if (err.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken)
          // eslint-disable-next-line consistent-return
          return refreshReq()
            .then(() => reqWrapper(req)(args, options))
            .catch((refreshErr) => {
              if (refreshErr.response.status === 401) {
                localStorage.clear()
                // navigate('/')
              }
            })
        // navigate('/')
      } else if (err.response.status === 409) {
        // console.error(err.response)
      } else if (err.response.status === 422) {
        // console.error(err.response)
      } else {
        // console.error(err.response)
      }
      throw err
    })
}

export default reqWrapper
