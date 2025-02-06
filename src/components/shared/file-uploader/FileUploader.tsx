'use client'

import { FileUploader } from 'react-drag-drop-files'
import { MdUploadFile } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const fileTypes = ['PDF']
type MultipleFileUploaderProps = {
  handleChange: (files: File[]) => void
  isLoading: boolean
  isExpanded: boolean
}

export default function MultipleFileUploader(props: MultipleFileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(props.isLoading)
  }, [props.isLoading])

  return (
    <FileUploader
      disabled={isLoading}
      multiple={true}
      handleChange={(files: File[]) => {
        setIsLoading(true)
        props.handleChange(files)
      }}
      types={fileTypes}
    >
      {isLoading && (
        <div
          className={classNames(
            'text-primary flex bg-sky-100 py-10 px-12 justify-center items-center border-dashed border-1 border-primary rounded-xl w-full',
            { 'h-20 items-center': !props.isExpanded, 'h-56 flex-col': props.isExpanded }
          )}
        >
          <FaSpinner className="animate-spin text-primary" size={props.isExpanded ? 40 : 32} />
          <p className="font-extrabold text-sm italic pt-2">Uploading CIB...</p>
        </div>
      )}
      {!isLoading && (
        <div
          className={classNames(
            'text-primary flex bg-sky-100 py-10 px-12 justify-center items-center border-dashed border-1 border-primary rounded-xl w-full',
            { 'h-20 items-center': !props.isExpanded, 'h-56 flex-col': props.isExpanded }
          )}
        >
          <MdUploadFile size={props.isExpanded ? 40 : 32} />
          <p className="font-extrabold text-sm italic pt-2">Drag & Drop CIB</p>
        </div>
      )}
    </FileUploader>
  )
}
