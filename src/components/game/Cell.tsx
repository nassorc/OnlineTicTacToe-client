import {X, Circle} from "lucide-react"
import { Icons } from "../Icons";

export default function Cell({value, handleClick}) {
  let component;
  if(value === "X" || value === "x") {
    component = <Icons.x size="44px"/>
  }
  else if(value === "O" || value === "o") {
    component = <Icons.circle size="44px"/>
  }
  else {
    component = "";
  }
  return(
    <div 
      className="w-full h-full col-span-1 row-span-1 bg-[#353535] rounded-sm border border-purple-950 flex items-center justify-center"
      onClick={handleClick}
    >
      {component}
    </div>
  )
}