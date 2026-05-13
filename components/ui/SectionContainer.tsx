interface SectionContainerProps {
  children:   React.ReactNode
  className?: string
  id?:        string
}

export function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  return (
    <section id={id} className={`px-4 md:px-6 py-12 md:py-16 ${className}`}>
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  badge?:     string
  title:      string
  subtitle?:  string
  center?:    boolean
}

export function SectionHeading({ badge, title, subtitle, center }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block bg-[#25D366]/10 text-[#25D366] text-xs font-bold
                         px-3 py-1 rounded-full uppercase tracking-wide mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
