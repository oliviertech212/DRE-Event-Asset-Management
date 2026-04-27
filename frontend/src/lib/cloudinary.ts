import { toast } from 'sonner'

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset'
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'

export interface UploadResult {
  url: string
  publicId: string
  bytes?: number
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export const loadCloudinaryWidget = () => {
  return new Promise((resolve, reject) => {
    if (window.cloudinary) {
      resolve(window.cloudinary)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/global/all.js'
    script.onload = () => resolve(window.cloudinary)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export const openUploadWidget = (options: {
  multiple?: boolean
  maxFiles?: number
  folder?: string
  onSuccess: (results: UploadResult[]) => void
  onError?: () => void
}) => {
  loadCloudinaryWidget().then((cloudinary: any) => {
    const widget = cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        multiple: options.multiple || false,
        maxFiles: options.maxFiles || 1,
        sources: ['local', 'url'],
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxFileSize: 5000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        cropping: true,
        showSkipCropButton: true,
        folder: options.folder || 'digital_realm',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#ff8c42',
            tabIcon: '#ff8c42',
            menuIcons: '#ff8c42',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#ff8c42',
            action: '#ff8c42',
            inactiveTabIcon: '#999999',
            error: '#d62839',
            inProgress: '#ff8c42',
            complete: '#4cb963',
            sourceBg: '#f3f6f7',
          },
        },
      },
      (error: any, result: any) => {
        if (error) {
          toast.error('Upload failed')
          options.onError?.()
          return
        }

        if (result.event === 'success') {
          const uploadedFile: UploadResult = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
            bytes: result.info.bytes,
          }
          options.onSuccess([uploadedFile])
        }

        if (result.event === 'queues-end') {
          widget.close()
        }
      }
    )

    widget.open()
  })
}
