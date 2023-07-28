import {X, Circle} from "lucide-react"

export default function Cell({value, handleClick}) {
  let component;
  if(value === "X" || value === "x") {
    component = <X />
  }
  else if(value === "O" || value === "o") {
    component = <Circle />
  }
  else {
    component = "";
  }
  return(
    <div 
      className="w-full h-full col-span-1 row-span-1 bg-[#353535] border border-purple-950 flex items-center justify-center"
      onClick={handleClick}
    >
      {component}
    </div>
  )
}