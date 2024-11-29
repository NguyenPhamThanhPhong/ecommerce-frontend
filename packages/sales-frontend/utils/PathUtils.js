import { useRouter } from "next/router";

export function isHomePage() {
  
  return window.location.pathname === '/' || window.location.pathname === '/home';
}

export function checkPath(){
    const router = useRouter();
    return router.asPath.toUpperCase();
}