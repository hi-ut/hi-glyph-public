import Link from 'next/link'
import React from 'react'

function adminGlyphsPage() {
  return (
    <div>
      <div className='p-2 text-xl font-bold'>Glyphs Admin Page</div>
      <div className='flex gap-4 py-4'>
        <Link href={"/admin/glyphs/import"} className='btn btn-primary'>Import</Link>
        <Link href={"/admin/glyphs/export"} className='btn btn-secondary'>Export</Link>
        <Link href={"/admin/glyphs/drop"} className='btn btn-error'>Drop</Link>
      </div>
    </div>
  )
}

export default adminGlyphsPage