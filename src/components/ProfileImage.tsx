import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface PropType extends React.HTMLAttributes<HTMLDivElement>{
  profileImage: string
  size: "sm" | "md" | "lg" | "profile",
  rounded?: "sm" | "md" | "lg" | "full"
}
export default function ProfileImage(props: PropType) {
  const { profileImage, size, rounded, className } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const sizes = {
    "sm": 28,
    "md": 48,
    "lg": 68,
    "profile": 128
  }

  return (
    <div 
      className={cn(`aspect-square overflow-hidden`, className, rounded ? `rounded-${rounded}` : "rounded-sm")}
      style={{
        width: sizes[size] + "px",
        height: sizes[size] + "px"
      }}
    >
      {!imageLoaded && 
        <div className="w-full h-full bg-[slateblue]">

        </div>
      }
      {profileImage &&
        <img 
          className="block w-full h-full object-cover"
          src={profileImage} 
          alt="profile image"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      }
    </div>
  )
}
