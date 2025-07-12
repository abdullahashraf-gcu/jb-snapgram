import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import{useDebounce}from "react-use";
import { Input } from "../../components/ui/input";
import GridPostList  from "../../components/shared/gridpostlist";
import  Loader  from "../../components/shared/loader";
import { useGetIPosts, useSearchPosts } from "@/lib/react-query/queries";
import searchImg from "../../assets/icons/search.svg"
import filterImg from "../..//assets/icons/filter.svg"

export type SearchResultProps = {
  isSearchFetching:boolean;
  searchedPosts:any;
}
const SearchResults=({isSearchFetching,searchedPosts}:SearchResultProps)=>{
  if(isSearchFetching){
    return <Loader/>;
  } else if(searchedPosts && searchedPosts.documents.length>0){
    return <GridPostList posts={searchedPosts.documents}/>
  }else{
    return(
      <p className=" className="text-light-4 mt-10 text-center w-full> No Results Found</p>
    )
  }
};

const Explore = () => {
    const{ref, inView}= useInView();
    const{data:posts,fetchNextPage,hasNextPage}=useGetIPosts();
  
console.log(posts)
    const[searchValue, setSearchValue] = useState("");
    const[debouncedSearchTerm,setdebouncedSearchTerm]=useState("");
    useDebounce(()=>setdebouncedSearchTerm(searchValue),500,[searchValue]);

    const{data:searchedPosts,isFetching:isSearchFetching}=useSearchPosts(debouncedSearchTerm);

    useEffect(()=>{
      if(!inView && !searchedPosts){
        fetchNextPage();
      }
    },[inView,searchValue]);

     if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
     const shouldShowSearchResults = searchValue !== "";
     const shouldShowPosts = !shouldShowSearchResults && 
     posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container scrollbar-home">
       <div className="explore-inner_container">
          <h2 className="h2-bold w-full">Search Posts</h2>
          <div className="flex px-4 w-full rounded-lg bg-dark-4">
            <img src={searchImg} alt="" height={24} width={24}/>
            <Input
            type="text"
            placeholder="Search"
            className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 m-0"
            value={searchValue}
            onChange={(e)=>{
              const{value}= e.target;
              setSearchValue(value);
            }}
            />
          </div>
           </div>

          <div className="flex-between w-full max-w-5xl mt-6 mb-6">
          <h3 className="h3-bold">Popular Today</h3>

          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src={filterImg}
            width={20}
            height={20}
            alt="filter"
          />
          </div>
        </div>

      

        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
         {
          shouldShowSearchResults?( 
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />):shouldShowPosts?(
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ):(
          posts.pages.map((item,index)=>( 
        <GridPostList key={`page-${index}`} posts={item.documents} />)))
       
         }
        </div>

        {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
          
    </div>
  )
}

export default Explore