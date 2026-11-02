type Props = {
  title: string
  aspect?: string
  className?: string
}

export default function PlaceholderImage({ title, aspect = '16 / 9', className }: Props) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <rect width="1200" height="675" fill="#151922"/>
    <rect x="1" y="1" width="1198" height="673" fill="none" stroke="#b48c48" stroke-width="1" stroke-dasharray="6 6" opacity=".4"/>
    <text x="600" y="320" text-anchor="middle" font-family="Poppins, sans-serif" font-size="26" font-weight="400" fill="#e4d18e">${title}</text>
    <text x="600" y="360" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" fill="#8a8f9a">placeholder · replace with final image</text>
  </svg>`
  const src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  return (
    <div className={className} style={{ aspectRatio: aspect, overflow: 'hidden', borderRadius: 2, background: '#151922' }}>
      <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}