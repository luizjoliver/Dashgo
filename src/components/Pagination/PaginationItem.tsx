

import { Button } from "@chakra-ui/react"

interface PaginatioItemProps{
isCurrent?:boolean,
number:number,
onPageChange:(page:number) => void
}

export default function PaginationItem({isCurrent =false ,number,onPageChange} :PaginatioItemProps) {
  if(isCurrent){
    return(
        <Button size="small" 
            px="4"
            py="2"
            width="4"
            fontSize="xs"
            colorScheme="pink"
            disabled
            _disabled={{bg:"pink.500",cursor:"dafault"}}>
              {number}
        </Button>
    )
  }

  return(
    <Button size="small" 
            px="4"
            py="2"
            width="4"
            color="white"
            fontSize="xs"
            bg="gray.700"
            _hover={{bg:"gray.500"}}
            onClick={() => onPageChange(number)}
            >
              {number}
    </Button>
  )
  
}
