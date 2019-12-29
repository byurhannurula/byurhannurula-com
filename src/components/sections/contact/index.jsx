import React from 'react'

import Layout from 'components/layout'
import ContactForm from './form'

import { Title, Text } from './styles'

const Contact = () => (
  <Layout>
    <Title>Contact</Title>
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
      voluptatibus optio dolores expedita.
    </Text>
    <ContactForm />
  </Layout>
)

export { Contact }
