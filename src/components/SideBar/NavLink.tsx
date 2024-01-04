"use client"

import {Link , LinkProps as chakraLinkProps } from "@chakra-ui/next-js"
import { Icon, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import { ElementType } from "react"

interface NavLinkProps  extends chakraLinkProps {
  icon:ElementType,
  children:string,
}

export default function NavLink({icon,children,...rest}:NavLinkProps) {
  const data = {...rest}
  const pathName = usePathname()

  const isActive = pathName === data.href ? true : false 

  

 
  return (
    <Link  display="flex" 
    textAlign="center" 
    color={isActive ? "pink.500" : "gray.400"}
    _hover={{color:"purple.50"}} 
    {...rest}>
                <Icon as={icon} fontSize="20"/>
                <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  )
}
