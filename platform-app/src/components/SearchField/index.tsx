import SearchBar from "material-ui-search-bar";
import { useState } from "react";

export default function Search(this: any){
  const [query, setQuery] = useState<string>('')

  function searchRequest(searchInput: string){
    
  }

  function clearSearch(){
    setQuery('')
    searchRequest(query)
  }

  return (
  <SearchBar
    value={query}
    onChange={(searchInput) => searchRequest(searchInput)}
    onCancelSearch={() => clearSearch()}
    searchIcon={<></>}
    closeIcon={<></>}
  />
);
}



