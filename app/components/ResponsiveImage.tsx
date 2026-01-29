import Image from 'next/image'
import { DrupalImage } from '@/lib/types'

interface ImageVariation {
  name: string
  url: string
  width: number
  height: number
}

interface ResponsiveImageProps {
  // New simple interface
  src?: string
  alt?: string
  fill?: boolean
  className?: string
  variations?: ImageVariation[]
  targetWidth?: number
  // Legacy interface
  image?: DrupalImage
  priority?: boolean
  sizes?: string
  width?: number
  height?: number
}

function getProxiedUrl(url: string): string {
  // Convert absolute Drupal URLs to use the local proxy
  // http://ted3nea.decoupled.website/sites/default/files/... -> /sites/default/files/...
  let processedUrl = url

  if (processedUrl.includes('/sites/')) {
    const sitesIndex = processedUrl.indexOf('/sites/')
    processedUrl = processedUrl.substring(sitesIndex)
  }

  // Strip query strings (like ?itok=...) as they cause issues with Next.js Image
  // and Drupal requires itok for styled images anyway
  const queryIndex = processedUrl.indexOf('?')
  if (queryIndex !== -1) {
    processedUrl = processedUrl.substring(0, queryIndex)
  }

  return processedUrl
}

export default function ResponsiveImage({
  src,
  alt = '',
  fill = false,
  className = '',
  variations,
  targetWidth = 800,
  image,
  priority = false,
  sizes = '100vw',
  width,
  height,
}: ResponsiveImageProps) {
  // Determine the image source - prefer the original URL over variations
  // because Drupal image style URLs require itok tokens which we can't use
  let imageSrc: string | null = null
  let imageAlt = alt

  if (src) {
    // New interface - direct src prop (use as-is, it's the original)
    imageSrc = src
  } else if (image?.url) {
    // Legacy interface - image object (use original url)
    imageSrc = image.url
    imageAlt = alt || image.alt || ''
  }

  if (!imageSrc) {
    return null
  }

  // Proxy the URL through our API to handle CORS/SSL
  const proxiedSrc = getProxiedUrl(imageSrc)

  // Use fill mode
  if (fill) {
    return (
      <Image
        src={proxiedSrc}
        alt={imageAlt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        placeholder="empty"
        unoptimized
      />
    )
  }

  // Use fixed dimensions
  if (width && height) {
    return (
      <Image
        src={proxiedSrc}
        alt={imageAlt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        placeholder="empty"
        unoptimized
      />
    )
  }

  // Default: responsive with aspect ratio container
  const aspectWidth = image?.width || 16
  const aspectHeight = image?.height || 9
  const aspectRatio = `${aspectWidth}/${aspectHeight}`

  return (
    <div
      className={`relative w-full bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={proxiedSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        placeholder="empty"
        unoptimized
      />
    </div>
  )
}
