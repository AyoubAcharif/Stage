'use client'

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react'
import Navbar from './components/navbar'
import HomePage from './components/homepage'
import Footer from './components/footer'

export default function Home() {
  return (
    <><Navbar />
      <Box as="main" minH={"calc(100vh - 8rem)"} >
        <HomePage />
        <br />
      </Box>
      <Footer />
    </>
  )
}




