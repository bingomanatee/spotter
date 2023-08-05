"use client"
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import actState from '~/lib/actState'
import Runsheet from '~/components/pages/act-views/Runsheet'
import useForestFiltered from '~/components/utils/useForestFiltered'
import Previs from '~/components/pages/act-views/Previs'

export default function Acts() {
  return (
    <Tabs isLazy p={0}>
      <TabList>
        <Tab>Previs Board</Tab>
        <Tab>Script</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Previs/>
        </TabPanel>
        <TabPanel>
          <Runsheet/>
        </TabPanel>
      </TabPanels>
    </Tabs>)
}
