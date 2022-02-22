import create, { UseBoundStore } from 'zustand'
import { devtools } from 'zustand/middleware'

class Wrapper {
  f () {
    return create(commonStore)
  }
}

type Type = ReturnType<Wrapper['f']>

interface StoreType {
  [key: string]: Type
}

interface ObjectType {
  [key: string]: any
}

const Stores: StoreType = {}

const commonStore = set => ({
  actions: {
    setItem: (key: string, value: any) => set(() => ({ [key]: value })),
    set: (value: ObjectType) => set(() => value), // Value has to be object

    get: (old_url: string, params = {}) => {
      if (!old_url) return
      let url = new URL(old_url)
      let search = url.search.substring(1)
      let old_params = search
        ? JSON.parse(
            '{"' +
              decodeURI(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
              '"}'
          )
        : {}

      url.search = new URLSearchParams({ ...old_params, ...params }).toString()

      set(() => ({ _loading: 1 }))
      fetch(url.href)
        .then(d => d.json())
        .then(data => {
          set(() => ({ _loading: 0, _data: data }))
        })
        .catch(e => {
          set(() => ({ _loading: 0, _error: true }))
        })
    },
    post: async (url: string, params: ObjectType, headers: ObjectType) => {
      set(() => ({ _loading: 1 }))
      await fetch(url, { method: 'POST', body: JSON.stringify(params) })
        .then(d => d.json())
        .then(data => {
          set(() => ({ _loading: 0, _data: data }))
        })
        .catch(e => {
          set(() => ({ _loading: 0, _error: true }))
        })

      // set(state => ({ _loading: 0, _data: data }))
    }
  }
})

const DEV = true

const createStore = (storeName: string) => {
  let Store = Stores[storeName]
  if (Store) return Store
  if (DEV) {
    Stores[storeName] = create(devtools(commonStore, { name: storeName }))
  } else Stores[storeName] = create(commonStore)
  return Stores[storeName]
}

export default createStore
