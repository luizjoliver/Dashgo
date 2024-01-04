"use client"

import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import SideBar from "@/components/SideBar";

import { Box,Button,Checkbox,Flex, Heading, Icon, Spinner, Table, Tbody, 
Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import {Link} from "@chakra-ui/next-js"


import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { QueryClient } from "react-query";
import { api } from "@/services/api";

type UserData = {
  
    email:string,
    name:string,
    id:number,
    createdAt:string
  
}


export default function UserList() {

  const [page,setPage] = useState(1)

  const {data,isLoading,error,isFetching}= useUsers(page)

  
  async function handlePrefetchUser (userId:number){
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(["users",userId],async () =>{
      const resp = await api.get(`users/${userId}`)

        console.log(resp)
        
      return resp.data
    },{
      staleTime: 1000 * 60 * 10 // 10 Minutes
    })

  }
  

  const isWideVersion = useBreakpointValue({
    base:false,
    lg:true
  })

  

  return (
    <Box>
        <Header/>

        <Flex w="100%" my="6" maxW="1280" mx= "auto" px="6">
          
            <SideBar/>
        

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal" >
                  Usuários
                  {!isLoading && isFetching && <Spinner size="sm" color="grat.500" ml="4"/> }
                  </Heading>

                <Link href="/users/create" _hover={{underline:"none"}} >
                  <Button
                  
                  size="sm"
                  fontSize="16"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine}/>}
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>

             {isLoading ? (
              <Flex justify="center">
                <Spinner/>
              </Flex>
             ) : error ? (
                <Flex justify="center">
                    <Text>Falha ao obter dados dos usuários</Text>
                </Flex>
             ) : (
              <>
              <Table colorScheme="whiteAplha" >
              <Thead>
                  <Tr>
                    <Th px={["4","4","6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink"/>
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"> </Th>
                  </Tr>
              </Thead>

              <Tbody>
                
                  {data!.users.map((user : UserData) =>{
                      return(
                        <>
                        <Tr key={user.id}>
                    <Td px={["4","4","6"]}>
                       <Checkbox colorScheme="pink"/>
                    </Td>
                    <Td>
                      <Box>

                        <Link color="purple.400" href={``} 
                        onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>

                        <Text fontSize="small" color="gray.200" >{user.email}</Text>
                    
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.createdAt}</Td>}
                    { isWideVersion && (<Td>
                      <Button 
                      
                      size="sm" 
                      fontSize="small" 
                      colorScheme="purple"
                      leftIcon={<Icon as={RiPencilLine}
                      fontSize="16" />}
                          >
                          Editar
                      </Button>
                    </Td>)}
                  </Tr>
                  </>
                      )
                  })}
              </Tbody>

              </Table>

             <Pagination totalCountOfRegisters={data!.totalCount} currentPage={page} onPageChange={setPage}/>
            </>
             )}
             

          </Box>
          </Flex>
    </Box>
  )
}