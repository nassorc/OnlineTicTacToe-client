import { useContext, useState } from "react";
import { Icons } from "@/components/Icons";
import PageShell from "@/components/PageShell";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import firebaseApp, { storage, ref, uploadBytes, getDownloadURL } from "../../config/firebase";
import UserContext from "@/context/user";
import { logoutUser, AUTH_ACTIONS, useAuth } from "@/context/auth";

export default function ProfilePage() {
  const [authState, authDispatch] = useAuth();
  const { user, setUser } = useContext(UserContext);
  const [isUploading, setIsUploading] = useState(false);
  const onUploadImage = async (e) => {
    const file = e.target.files[0];

    const imageRef = ref(storage, `profile_images/${user.username}`);
    setIsUploading(true);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(( url ) => {
            fetch(`http://localhost:3000/api/user/${user._id}/profile-image`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({image: url})
            })
            setUser(prevState => ({
              ...prevState,
              profileImage: url
            }))
            setIsUploading(false);
          })
      }) 
  }
  const onDeleteAccount = async (e) => {
    await fetch(`http://localhost:3000/api/user/${user._id}/delete`, {
      method: "POST",
      credentials: "include"
    })
    logoutUser(authDispatch, AUTH_ACTIONS);
  }
  return (
    <PageShell>
      <section className="flex flex-col">
        <UserProfile user={user} isUploading={isUploading}/>
        <div>
          <form onSubmit={onUploadImage}>
            <Button asChild>
              <label htmlFor="profile-img">
                <Icons.camera />
                upload
              </label>
            </Button>
            <input 
              id="profile-img"
              type="file" 
              name="profile-img" 
              multiple={false}
              onChange={onUploadImage}
              className="hidden"
            />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <Icons.settings />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger 
                    className="flex justify-center items-center space-x-2"
                    onClick={(e) => {e.stopPropagation()}}
                  >
                    <Icons.trash />
                    <span>Delete Account</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanelty delete your accout. 
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteAccount}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>

        </div>
      </section>
    </PageShell>
  )
}

