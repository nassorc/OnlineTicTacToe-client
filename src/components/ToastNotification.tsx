import React from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react"

export default function ToastNotification() {
  const notify = () => toast.custom(t => 
    <div className="flex bg-white text-black rounded-sm border border-black/30">
      <div className="py-2 px-4 w-max flex items-center">
        player invited you
      </div>
      <button 
        className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      ><Check className="text-green-400"/></button>
      <button 
        className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
        onClick={() => toast.dismiss(t.id)}
      ><X className="text-red-400"/></button>
    </div>,
    {
      duration: Infinity,
      position: 'top-right',

      // Styling
      style: {},
      className: '',

      // Custom Icon
      icon: '👏',

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
  });
  return (
    <>
      <Toaster />
    </>
  )
}
