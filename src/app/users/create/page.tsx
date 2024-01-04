"use client"

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Box,Button,Divider,Flex, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import {Link} from "@chakra-ui/next-js"
import { Input } from "@/components/Form/Input";
import { QueryClient, useMutation } from 'react-query';
import { api } from '@/services/api';
import { useMirage } from '@/services/mirage';
import {useRouter} from "next/navigation"


 //Initialize mirage Server
useMirage



type CreateUserFormData = z.infer<typeof CreateUserFormSchema >

const CreateUserFormSchema  = z.object({
  name:z.string(),
  email:z.string().email("E-mail obrigatório"),
  password:z.string().min(6,"No mínimo 6 caracteres"),
  password_confirmation:z.string().min(6,"A confirmação precisa de no mínimo 6 caracteres")
}).refine((data) => data.password === data.password_confirmation, {
  message: "Confirmação de senha inválida"
})


export default function CreateUser() {

  const router = useRouter()

  const createUser = useMutation(async (user:CreateUserFormData) =>{
    const response  = await api.post("users" ,{
      user:{
        ...user,
        created_at:new Date()
      }
    })

    return  response.data.user

  },{
    onSuccess: () =>{
      const queryClient = new QueryClient()

      queryClient.invalidateQueries("users")
    }
  })

  const {register, handleSubmit, formState:{isSubmitting,errors} } = useForm({
    resolver:zodResolver(CreateUserFormSchema)
  })

 const handleCreateUser :SubmitHandler<CreateUserFormData> =  async(values) => {
  
  await createUser.mutateAsync(values)
  
 
    router.push("/users")
 }

  return (
    <Box>
        <Header/>

        <Flex w="100%" my="6" maxW="1280" mx= "auto" px="6">
            <SideBar/>
        

          <Box 
          flex="1" 
          borderRadius={8} 
          bg="gray.800"
          p={["6","8"]} 
          as='form'
          onSubmit={handleSubmit(handleCreateUser)}>

            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

              <Divider my="6" bgColor="gray.700"/> 

              <VStack spacing="8">
                <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                    <Input  label="Nome Completo" {...register("name")} error={errors.name}/>
                    <Input  label="E-mail" type="email" {...register("email")} error={errors.email}/>
                </SimpleGrid>

                <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                    <Input {...register("password")} label="Senha" type="password" error={errors.password}/>
                    <Input {...register("password_confirmation")} label="Confirmação da senha" type="password" error={errors.password_confirmation}/>
                </SimpleGrid>

              </VStack>

              <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                    <Link href="/users">
                      <Button colorScheme="whiteAlpha">Cancelar</Button>
                    </Link>
                    <Button type='submit' colorScheme='pink' isLoading={isSubmitting}>Entrar</Button>
                </HStack>
              </Flex>

          </Box>

          </Flex>
    </Box>
  )
}
