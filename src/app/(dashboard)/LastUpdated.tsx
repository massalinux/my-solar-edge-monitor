'use client'

import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago'
import it from 'javascript-time-ago/locale/it.json'
TimeAgo.addDefaultLocale(it)

export default function ({date}: {date: Date}) {
  return (
    <p>Aggiornato: <ReactTimeAgo date={date} /></p>
  )
}