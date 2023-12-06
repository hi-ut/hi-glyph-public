import { authOptions } from '@/lib/auth-option'
import { getServerSession } from 'next-auth'
import React from 'react'
import ChangeUserPasswordForm from './change-password-form'

export default async function UserChangePasswordPage() {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email
  return (
    <div>
      <h1>UserChangePasswordPage</h1>
      <p>UserName: {userEmail}</p>
      <ChangeUserPasswordForm userEmail={userEmail} />
    </div>
  )
}
