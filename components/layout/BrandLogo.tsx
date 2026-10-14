import Image from 'next/image'

export function BrandLogo({ variant = 'header', priority = false }: {
  variant?: 'header' | 'footer'
  priority?: boolean
}) {
  return (
    <span className={variant === 'footer' ? 'brand-logo brand-logo--footer' : 'brand-logo brand-logo--header'}>
      <Image
        src="/brand/chaduvuko-logo.png"
        alt="Chaduvuko — LEARN. BUILD. GROW."
        width={1536}
        height={1024}
        sizes={variant === 'footer' ? '332px' : '(min-width: 640px) 113px, 106px'}
        priority={priority}
      />
    </span>
  )
}
