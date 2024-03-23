import { upload } from '@/api/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { GetProp, message, Upload, UploadProps } from 'antd'
import React, { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

interface ImageUploadProps {
  value?: string
  onChange?: (val: string) => void
}

function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [loading, setLoading] = useState(false)

  const handleChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      console.log(`info====`, info)
      // const { data } = await upload(info.file.originFileObj)
      setLoading(false)
      onChange?.(info.file.response.data)
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="//localhost:8080/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default ImageUpload
