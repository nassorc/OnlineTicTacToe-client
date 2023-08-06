export default function FormShell({ children }: { children: React.ReactNode}) {
  return (
    <div className='p-4 max-w-md min-w-[400px] bg-white rounded-sm shadow-md space-y-6 text-start'>
      {children}
    </div>
  )
}
