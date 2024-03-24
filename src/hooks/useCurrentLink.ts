import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useCurrentLink = () => {
  const [elems, setElems] = useState<HTMLElement[]>();
  const { pathname } = useLocation();

  const autoClickLink = () => {
    if (elems) {
      elems.forEach((elem) => {
        if (elem.getAttribute("href") === pathname) {
          elem.click();
        }
      });
    }
  };

  useEffect(() => {
    if (document.querySelectorAll("aside a")) {
      setElems(Array.from(document.querySelectorAll("aside a")));
    }

    return () => {};
  }, []);


  useEffect(() => {
    if(elems){
        autoClickLink()
    }

    return () => {
        
    }
}, [elems])

  return {
    elems,
    autoClickLink,
  };
};
