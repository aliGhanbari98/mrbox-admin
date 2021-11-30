export const pickDataByLanguage = (data = {}, language = 'EN'): string =>
  data && Object.keys(data).length ? data[language] : ''

export const convertToSelectOption = (
  data = [],
  lang = 'EN'
): Array<{ label: string; value: string; id: string }> =>
  data.map((item) => {
    const { title, id, first_name, last_name } = item
    const name = typeof item === 'string' ? item : first_name + ' ' + last_name
    return {
      label: title ? title[lang] || title : name,
      value: title ? title[lang] || title : item,
      id: id || '',
    }
  })

export const convertToAttributes = (
  data = {}
): Array<{ key: string; value: string; id: string }> =>
  Object.keys(data).map((key, index) => ({
    key,
    value: data[key],
    id: index + '',
  }))

export const removeSelectedOptions = (
  selected = [''],
  options
): Array<{ key: string; value: string }> =>
  options.filter(({ value }) => !selected.find((item) => item === value))

export const convertToCurrencyOptions = (
  data = []
): Array<{ label: string; value: string }> =>
  data.map((item) => {
    const {
      currency_code,
      currency: { name },
    } = item
    return {
      label: name,
      value: currency_code,
    }
  })

export const convertToLangOptions = (
  data
): Array<{ label: string; value: string }> =>
  data.map((item) => {
    return {
      label: item.name,
      value: item.code,
    }
  })

export const convertToCountryOptions = (
  data
): Array<{ label: string; value: string }> =>
  data.map((item) => {
    return {
      label: item.name,
      value: item.code,
    }
  })

export const convertArrayToObject = ({
  data = [{ key: '', value: '' }],
  targetKey,
  targetValue,
}): any => {
  let result = {}
  console.log(data)
  data.forEach((item) => {
    const key = item[targetKey]
    const value = item[targetValue]
    result = { ...result, [key]: value }
  })
  return result
}

export const convertFilesToGallery = (
  data = [],
  lang = 'EN'
): Array<{ src: string; id: string }> =>
  data.map(({ id, thumbnail_url, alt }) => {
    return {
      src: thumbnail_url,
      id,
      alt: pickDataByLanguage(alt, lang),
    }
  })

export const haveTokens = () =>
  !!(
    localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')
  )

export const removeEmpty = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''))

// export const handler = ({ query, params, stateHandler, formatter, hasSingleItem }) => {
//   query(removeEmpty(params)).then((data) =>
//     stateHandler(formatter ? formatter(data, hasSingleItem) : data)
//   )
// }

export const paginationHandler = ({
  getData,
  filters = {},
  setActivePage = Function.prototype(),
  limit = 10,
  page,
}): void => {
  getData({ limit, offset: (page - 1) * limit, ...removeEmpty(filters) }, false)
  setActivePage(page)
}
