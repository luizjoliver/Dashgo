"use client"

import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect } from "react";

type SideBarDrawerContextData = UseDisclosureReturn

export const DrawerContext = createContext<SideBarDrawerContextData>({} as UseDisclosureReturn)


export default function SideBarDrawerContext({children}:{children:ReactNode}) {

    const disclosure = useDisclosure()

    const pathName = usePathname()

    useEffect(() =>{
      disclosure.onClose()
      
    },[pathName])

  return (

    <DrawerContext.Provider value={disclosure}>
        {children}
    </DrawerContext.Provider>
  )
}
