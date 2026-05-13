interface StatsCardProps {
  label:      string
  value:      string | number
  sub?:       string
  subUp?:     boolean
  icon:       string   // emoji
  iconBg?:    string   // tailwind bg class
  large?:     boolean
}

export function StatsCard({
  label, value, sub, subUp, icon, iconBg = 'bg-gray-100', large,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${iconBg}`}>
          {icon}
        </span>
        {sub && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            subUp
              ? 'bg-green-50 text-green-700'
              : 'bg-gray-50 text-gray-500'
          }`}>
            {sub}
          </span>
        )}
      </div>
      <p className={`font-black text-gray-900 leading-none mb-1 ${large ? 'text-4xl' : 'text-2xl'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
    </div>
  )
}
