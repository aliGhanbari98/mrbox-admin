export const removeEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== '' && v !== 0)
  )

const handler = ({ query, filters = {}, params }) =>
  query(removeEmpty({ ...params, ...filters })).then((data) => data)

export default handler
