let BASEURL;
let API;
if(import.meta.env.MODE === "prodution") {
  BASEURL = import.meta.env.VITE_SERVER_BASE_URL;
  API = import.meta.env.VITE_API_URL;
}
else {
  BASEURL = "http://localhost:3000";
  API = "http://localhost:3000/api";
}

const SIGNINURL = API + "/signin"; 
const SIGNUPURL = API + "/user";
const GETUSERURL = API + "/user";
const GETFRIENDSURL = API + "/friends"
const ADDFRIENDURL = API + "/friend/add";
const ACCEPTFRIENDREQUESTURL = API + "/friend/accept";
const REJECTFRIENDREQUESTURL = API + "/friend/reject";

// const apiHref = process.env.API_URL;

// const _CONSTANTS = {
//   location: {
//     href: window.location.href,
//   },
//   api: {
//     href: apiHref,
//     signin: apiHref + "/signin",
//   }
// }

export {
  BASEURL,
  API,
  SIGNINURL,
  SIGNUPURL,
  GETUSERURL,
  GETFRIENDSURL,
  ADDFRIENDURL,
  ACCEPTFRIENDREQUESTURL,
  REJECTFRIENDREQUESTURL
}