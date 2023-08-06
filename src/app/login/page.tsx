"use client"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Box, Button, Flex, Heading, Hide } from '@chakra-ui/react'
import styles from './style.module.scss';
//import { GlobalStateContext } from '~/components/GlobalState/GlobalState'

const LoginPage = () => {
  const supabaseClient = createClientComponentClient()
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only run query once user is logged in.
    if (user) {
      router.push('/')
    }
  }, [user]);

  const authContainer = useRef(null);
  const signInButton = useRef(null);
/*
  useEffect(() => {
    setTimeout(() => {
      const button = authContainer.current?.getElementsByTagName('button')[0] || [];
      if (button) {
        const wrapper = document.createElement('div');
        wrapper.appendChild(signInButton.current.cloneNode(true));
        wrapper.className = styles.wrapper;
        button.parentNode.replaceChild(wrapper, button);
        console.log('replaced button')
      }
    }, 50)

  }, [])*/

  return (
    <Flex direction="column" align="center" w="100%" pt={8}>
      <Heading>Sign In</Heading>
      <Box pad="medium" w={['100%', '80%', '80%']} ref={authContainer}>
        <Auth
          supabaseClient={supabaseClient}
          view="magic_link"
          appearance={{ theme: ThemeSupa }}
          theme="light"
          showLinks={false}
          providers={[]}
          redirectTo="http://localhost:3000/auth/callback"
        />
      </Box>
      <Box visibility="hidden">
        <Button type="submit" ref={signInButton}>Sign In to Spotter</Button>
      </Box>
    </Flex>
  )

}

export default memo(LoginPage);
