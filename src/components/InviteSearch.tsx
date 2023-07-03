import { useState } from "react";
import {Search} from "lucide-react"
import { API } from "../constants";

export default function InviteSearch({setInviteList}) {
    const [query, setQuery] = useState("");
    
    const handleSearch = async (query: string) => {
      if(!query) {
        setInviteList([]);
        return;
      }
      const res = await fetch(API + "/user/" + query);

      if(res.ok) {
        const data = await res.json();
        setInviteList(data);
      }
      return;
    }
    return (
      <div className="relative max-w-2xl mx-auto">
        <input 
          type="text"
          placeholder="search username" 
          value={query} 
          className="py-2 px-3 w-full rounded-md"
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value)
            handleSearch(value);
            
        }}/>
        <Search className="mx-3 absolute right-0 top-1/2 -translate-y-1/2 scale-90 text-white cursor-none pointer-events-none"/>
      </div>
    )
}