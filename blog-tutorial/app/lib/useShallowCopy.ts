import {useReducer, useEffect} from 'react';

type EntityType = object | null;

interface ReducerState {
  data: EntityType,
  isDirty: boolean,
}

const initialState = (): ReducerState => ({
  data: {},
  isDirty: false
})

const reducer = (state: ReducerState, {type, data}: { type: string, data: EntityType}) => {
  switch (type) {
    case 'clear':
      return initialState()
    case 'set':
      return {
        data: {
          ...data
        },
        isDirty: false
      };
    case 'mutate':
      return {
        data: {
          ...state.data,
          ...data
        },
        isDirty: true
      };
    default:
      throw new Error('Unknown action: ' + type);
  }
};

function useShallowCopy<T extends EntityType>(data: T): [T, boolean, Function, Function] {
  const [persistedData, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    dispatch({
      type: 'set',
      data
    })
  }, [data])

  const mutate = (data: object) => dispatch({
    type: 'mutate',
    data,
  })

  const clear = () => dispatch({
    type: 'clear',
    data: null
  })

  return [
    persistedData.data as T,
    persistedData.isDirty,
    mutate,
    clear,
  ]
}

export default useShallowCopy
