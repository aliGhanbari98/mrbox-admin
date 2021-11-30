// const CL = (txt, color) =>
//   console.log(`%c ${txt}`, `color: ${color};font-size: 20px;`)

/*
 * API: 	API Base URL
 * IS_PRODUCTION: Boolean of is production mode
 * DEFAULT_LANGUAGE: Set default language [FA or EN]
 *
 *
 *
 *
 * */

const Configs =
  // process.env.NODE_ENV === 'production' &&
  window.location.host === 'client.calistu.com:3007'
    ? {
        API: 'http://client.calistu.com:8040/api/v1/admin',
        BASE_URL: 'http://client.calistu.com:8040',
        IS_PRODUCTION: true,
        DEFAULT_LANGUAGE: 'EN',
      }
    : {
        API: 'http://194.5.193.96:8041/api/v1/admin',
        BASE_URL: 'http://194.5.193.96:8041',
        IS_PRODUCTION: false,
        DEFAULT_LANGUAGE: 'EN',
      }

export default Configs
