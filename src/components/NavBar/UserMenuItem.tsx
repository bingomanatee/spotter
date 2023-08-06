"use client"
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { userManager } from '~/lib/userManager'
import useForestFiltered from '~/components/utils/useForestFiltered'
import { useRouter } from 'next/navigation'

export default function UserMenuItem() {
  const router = useRouter();

  const {user} = useForestFiltered(userManager, ['user'])
  if (user) {
    return (
      <HStack spacing="4">
        <Menu zIndex={1}>
          <MenuButton sx={{ height: '100%', margin: 0 }}>
            <HStack spacing={2}>
              <Text fontSize="xs">
                {user.email}</Text>
              <ChevronDownIcon/></HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => {router.push('/account/signput')}}>Sign Out</MenuItem>
          </MenuList>
        </Menu>

        <Image alt="user-logged-in-icon" src="/img/icons/user.svg"
               width={24} height={24}/>
      </HStack>
    )
  }
  return <Link href="/login">
    <Image alt="user-not-logged-in-icon"
           width={24} height={24}
           src="/img/icons/user-inactive.svg"/>
  </Link>
}
