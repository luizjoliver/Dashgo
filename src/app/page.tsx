"use client"

import { Input } from '@/components/Form/Input';
import {Flex,Button,Stack} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"


type SigInFormData = z.infer<typeof SigInFormSchema>

const SigInFormSchema = z.object({
  email:z.string().email("Formato inválido"),
  password:z.string().min(6,"A senha precisa de no mínimo 6 caracteres")
})

export default function Home() {

  const {register,handleSubmit , formState:{errors,isSubmitting}}  = useForm({
    resolver:zodResolver(SigInFormSchema)
  })

 
  const handleSignIn: SubmitHandler<SigInFormData> = async({email,password},event) =>{

    await new Promise(resolve => setTimeout(resolve,2000))
    
    
      
  }
  

  return (
   <Flex
    w="100vw"
    h="100vh" 
    align="center"
    justify="center"
    >

      <Flex
      as="form"
      w="100%"
      maxW={360}
      bg="gray.800"
      p={8}
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
    
            <Input type='email'   error={errors.email}  label="E-email" {...register("email")}/>
            <Input type='password'  error={errors.password}  label="Senha" {...register("password")}/>
            

        </Stack>

        
          <Button type='submit' w="100%"  mt={6} colorScheme='pink' isLoading={isSubmitting}>Entrar</Button>
        
      </Flex>

   </Flex>
  )
}
