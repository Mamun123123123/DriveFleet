import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const MyBookingsPage = async() => {
    const session = await auth.api.getSession({
        headers:await headers()
    })
    // console.log(session);
    const user = session?.user
    console.log(user);
    
    
    const res = await fetch(`http://localhost:5000/bookings/${user?.id}`)
    const data = await res.json()
  return (
    <div>
      my bookings
    </div>
  )
}

export default MyBookingsPage
