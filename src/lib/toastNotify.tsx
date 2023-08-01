import toast from "react-hot-toast";
import { Icons } from "../components/Icons";

const toastNotify = (
    playerId, 
    playerUsername, 
    roomId, 
    onAccept, 
    onReject
  ) => toast.custom(t => 
  <div className="flex bg-white text-black rounded-sm border border-black/30">
    <div className="py-2 px-4 w-max flex items-center">
      {playerUsername} invited you
    </div>
    <button 
      className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
      onClick={() => { 
        toast.dismiss(t.id)
        onAccept(playerId, roomId);
      }}
    ><Icons.check className="text-green-400"/></button>
    <button 
      className='h-full bg-white border border-black/30 rounded-none cursor-pointer'
      onClick={() => {
        toast.dismiss(t.id)
        onReject(playerId, roomId);
      }}
    ><Icons.x className="text-red-400"/></button>
  </div>,
  {
    duration: 8000,
    position: 'top-center',

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

export default toastNotify;