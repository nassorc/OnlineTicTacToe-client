import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { API } from "../config/constants";
import { Input } from "./ui/input";
// import useDebounce from "../hooks/useDebounce";

export default function PlayerSearch({setSearchQueryResult}) {
    const [query, setQuery] = useState("");

    useEffect(() => {
      if(query.length === 0) {
        setSearchQueryResult([]);
        return
      }
      async function getUsers() {
        const res = await fetch(API + "/users/username/" + query, {
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
        <Icons.search className="mx-3 absolute left-0 top-1/2 -translate-y-1/2 scale-90 text-site-base cursor-none pointer-events-none"/>
        <Input 
          type="text"
          placeholder="search username" 
          value={query} 
          className="py-2 px-12 w-full rounded-none"
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value)
          }}
        />
      </div>
    )
}