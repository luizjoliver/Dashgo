import { Flex ,Box,Text ,Avatar} from "@chakra-ui/react";


export default function Profile({showProfileData = true} :{showProfileData:boolean}) {
  return (
    <Flex>
            {showProfileData && (
              <Box mr="4" textAlign="right">

                    <Text>Luiz Fellipe</Text>

                    <Text color="gray.300" fontSize="small">
                    luizFellipeEmail@gmail.com
                    </Text>

              </Box>
            )}
            <Avatar size="md" name="Luiz Fellipe" src="https://github.com/luizJoliver.png"/>
          </Flex> 
  )
}
