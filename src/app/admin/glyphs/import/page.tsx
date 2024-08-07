import React from 'react'
import { UploadForm } from './upload-form'

function glyphImportPage() {
  return (
    <div>
      <h2>up load file</h2>
      <p>Only work on self hosting server.</p>
      <p>Error with Vercel or Netlify.</p>
      <UploadForm />
    </div>
  )
}

export default glyphImportPage