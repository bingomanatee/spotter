"use client"
// import styles from './page.module.css'
import { SUPABASE_CLIENT_KEY, userManager } from '~/lib/userManager'
import Welcome from '~/components/Welcome'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (userManager.getMeta(SUPABASE_CLIENT_KEY)) {
      return;
    }
    const supabase = createClientComponentClient();
    userManager.do.init(supabase, router);
  }, [router])

  return (
    <Welcome>&nbsp;</Welcome>
  )
}
