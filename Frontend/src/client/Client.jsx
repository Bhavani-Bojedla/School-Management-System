import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Client() {
  return (
    <div>
      <h1>Client Main Component</h1>
      <Outlet/>
    </div>
  )
}
