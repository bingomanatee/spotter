"use client"
import { useRouter } from 'next/navigation'
// import navManager from '~/lib/managers/navManager'
import { useCallback, useMemo } from 'react'
//import messageManager from '~/lib/managers/messageManager'
import { Button, Flex, Heading, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import Link from 'next/link'
import UserMenuItem from '~/components/NavBar/UserMenuItem'

export function NavBar({ user, pathName }) {
  const router = useRouter();

 // const { subTitle } = useForestFiltered(navManager, ['subTitle']);
/*  const showHelp = useCallback(() => {
    messageManager.dialog({
      title: 'How To Create and Edit Frames',
      view: 'help',
      actionPrompt: 'OK',
      cancelPrompt: ''
    })
  }, []);*/
  const goHome = useCallback(() => {
    router.push('/')
  }, [router])

  const goProjects = useCallback(( )=> {
    router.push('/projects')
  }, [router]);

  return (<Flex layerStyle="nav-frame" justify="space-between">
    <Menu zIndex={100000}>
      <MenuButton as={Button} leftIcon={<HamburgerIcon boxSize={6}/>} backgroundColor="transparent">
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem onClick={goHome}>Home Page</MenuItem>
        <MenuItem onClick={goProjects}>Projects</MenuItem>
      </MenuList>
    </Menu>
    <HStack>
      <Image alt="logo" src="/img/icons/logo.svg" width={24} height={24}/>
      <Link href="/"> <Heading size="sm">Spotter</Heading></Link>
      {/*{subTitle ? <Heading fontWeight="normal" size="sm">{subTitle}</Heading> : null}*/}
    </HStack>
    <UserMenuItem user={user}/>
  </Flex>
  )
}
