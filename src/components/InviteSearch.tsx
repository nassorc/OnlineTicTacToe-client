import { useEffect, useState } from "react";
import {Search} from "lucide-react"
import { API } from "../config/constants";
// import useDebounce from "../hooks/useDebounce";

export default function InviteSearch({setSearchQueryResult}) {
    const [query, setQuery] = useState("");

    useEffect(() => {
      if(query.length === 0) {
        setSearchQueryResult([]);
        return
      }
      async function getUsers() {
        const res = await fetch(API + "/user/username/" + query, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setSearchQueryResult(data);
      }
      const timer = setTimeout(() => {
        getUsers()
          .catch(err => console.log(err));
      }, 400);
      return () => {
        clearTimeout(timer);
      }
    }, [query, setSearchQueryResult]);
    
    return (
      <div className="relative max-w-2xl mx-auto">
        <input 
          type="text"
          placeholder="search username" 
          value={query} 
          className="py-2 px-3 w-full rounded-md bg-input-bg"
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value)
        }}/>
        <Search className="mx-3 absolute right-0 top-1/2 -translate-y-1/2 scale-90 text-white cursor-none pointer-events-none"/>
      </div>
    )
}