import { prisma } from '@/lib/db/prisma'
import UserAdminTable from './user-table'

async function adminUsersPage() {
  const allUsers = await prisma.user.findMany()

  return (
    <div>
      <h2 className='font-bold text-2xl'>User Admin Page</h2>
      <UserAdminTable userData={allUsers}/>
    </div>
  )
}

export default adminUsersPage