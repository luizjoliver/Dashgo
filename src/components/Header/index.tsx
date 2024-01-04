

import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Profile from "./Profile";
import SearchBox from "./SearchBox";
import NotificationsNav from "./NotificationsNav";
import Logo from "./Logo";
import useSideBarDrawer from "@/hooks/useSideBarDrawer";
import { RiMenuLine } from "react-icons/ri";

export default function Header() {

    const {onOpen} = useSideBarDrawer()

    const isWideVersion = useBreakpointValue({
      base:false,
      lg:true
    })

  return (
    <Flex as="header"
     maxWidth={1280} 
     w="100%"
     h="20"
     mx="auto"
     mt="4"
     align="center"
     px="6">

        {!isWideVersion && (
          <IconButton 
          aria-label="open navigation"
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          >

          </IconButton>

        )}

        <Logo/>

         { isWideVersion && <SearchBox/>}

          <Flex 
          align="center"
          ml="auto">

          <NotificationsNav/>
          <Profile showProfileData={isWideVersion as boolean}/>

        </Flex>

    </Flex>
  )
}
