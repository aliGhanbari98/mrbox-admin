const initialState = []

const reducers = {
  SET_LANGS: (_, state) => state,
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
