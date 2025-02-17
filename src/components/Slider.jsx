export function Slider({ className = "", ...props }) {
    return (
      <input
        type="range"
        className={`
          w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
          accent-amber-500 hover:accent-amber-600
          ${className}
        `}
        {...props}
      />
    )
  }