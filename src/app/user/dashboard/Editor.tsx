"use client";
import React from 'react'
// @ts-ignore
import {KageEditor} from "@/lib/kage-editor.mjs"
import "@/lib/kage-editor.css"

function Editor() {
  return (
    <div>Editor

      <KageEditor />
    </div>
  )
}

export default Editor