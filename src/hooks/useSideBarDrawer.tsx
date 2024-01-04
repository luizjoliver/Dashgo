import { DrawerContext } from "@/contexts/SideBarDrawerContext";
import { useContext } from "react";



export default function useSideBarDrawer() {

     const useSideBarDrawer = useContext(DrawerContext)
    
  return useSideBarDrawer
}
