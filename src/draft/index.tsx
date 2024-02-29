import { useEffect, useState } from 'react'

import {
  DraftData,
  DraftItem,
  DraftSession,
  EscrowSigner
} from '@scrow/core'

import useSWR from 'swr'

export function useDraftList (
  relay  : string,
  signer : EscrowSigner
) {
  const client = signer.client
  const pub    = signer.pubkey
  const url    = `${client.host}/drafts/list?pk=${pub}`

  const fetcher = async () => {
    const session = new DraftSession(signer)
    const data    = await session.list(relay)
    return data
  }

  const res  = useSWR<DraftItem[]>(url, fetcher)
  const data = res.data ?? []

  return { ...res, data }
}

export function useDraftSession (session : DraftSession) {
  const [ data, setData ] = useState<DraftData | undefined>()

  // const fetcher = async () => {
  //   // await session.refresh()
  //   return session.data
  // }

  useEffect(() => {
    if (!session.is_ready) {
      session.once('ready', () => {
        setData(session.data)
      })

      session.on('update', () => {
        setData(session.data)
      })
    }
  })

  

  // const pub = session.pubkey

  // const res = useSWR<DraftData>(`/draft/${pub}/${session.id}`, fetcher)

  // useEffect(() => {
  //   if (!res.error && res.data !== undefined) {
  //     setData(res.data)
  //   }

  // }, [ res.data ])

  return { data }
}
