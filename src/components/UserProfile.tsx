import ProfileImage from "./ProfileImage"

interface PropType {
  user: {
    _id: string
    username: string
    profileImage: string
    email: string
  }
  isUploading: boolean
}
export default function UserProfile(props: PropType) {
  const {user: {_id, username, profileImage, email}, isUploading} = props;
  return (
    <div className="flex space-x-4">
      <div className="relative max-w-32 w-32 max-h-32 aspect-square overflow-hidden">
        {isUploading && (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <div className="w-1/3 h-1/3 aspect-square border-8 border-white border-t-8 border-t-site-accent animate-spin rounded-full"></div>
        </div>
        )}
        <ProfileImage profileImage={profileImage} size="profile"/>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl">{username}</h1>
        <p className="text-lg">{email}</p>
      </div>
    </div>
  )
}
