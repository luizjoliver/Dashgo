"use client"


import { FormControl, FormLabel, Input as ChackraInput,InputProps as ChackraInputProps, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef,ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'


interface InputProps extends ChackraInputProps{
    name:string,
    label?:string,
    error?:FieldError 
}


 const  InputBase:ForwardRefRenderFunction<HTMLInputElement,InputProps> = ({name,label,error,...rest}:InputProps,ref) => {
  

  
  
  return (

    <FormControl isInvalid={!!error}>

              { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChackraInput
                name={name}
                id={name}
                ref={ref}
                focusBorderColor='pink.500'
                bgColor='gray.900'
                variant='filled'
                _hover={{bgColor:"gray.800"}}
                size="lg"
                {...rest}
                />
                {!!error &&(<FormErrorMessage>{error.message}</FormErrorMessage>)}
                

      </FormControl>

  )
}
export const Input = forwardRef(InputBase)