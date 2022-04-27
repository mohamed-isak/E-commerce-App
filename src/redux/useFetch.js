import { useState, useEffect } from "react";

const useFetch = (url,token) => {

    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);
   
    useEffect(() =>{
      const abortCont = new AbortController();
       console.log(url);
       console.log(token);
        setTimeout(() => {
          fetch(url,{
              headers: {
                Authorization: `Bearer ${token}`
              },
              abortCont: abortCont,
            })
          .then(res =>{
              if(!res.ok){
                 throw Error("Could not load the data");
              }
              console.log(res.data);
              return res.json();
          }).then(data =>{
              setIsPending(false);
              setData(data);
              setError(null);
          }).catch(err => {
               if(err.name==='AbortError'){
                console.log('fetch aborted')
               }else{
                setIsPending(false);
                setError(err.message);
               }
          })
        },1000);
        return () => abortCont.abort();
       },[]);

  return data;

}


export default useFetch;