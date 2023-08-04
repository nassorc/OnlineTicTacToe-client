import { cn } from "@/lib/utils";

interface PropType extends React.HTMLAttributes<HTMLDivElement>{
  profileImage: string
  size: "sm" | "md" | "lg" | "profile"
}
export default function ProfileImage(props: PropType) {
  const { profileImage, size, className } = props;
  const sizes = {
    "sm": 28,
    "md": 48,
    "lg": 68,
    "profile": 128
  }
  return (
    <div className={cn(`w-[${sizes[size]}px] h-[${sizes[size]}px] aspect-square bg-[slateblue] rounded-sm`, className)}>
      {profileImage &&
        <img 
          className="block w-full h-full object-cover rounded-sm"
          src={profileImage} 
          alt="profile image"
        />
      }
    </div>
  )
}
