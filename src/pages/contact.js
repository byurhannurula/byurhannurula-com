import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import {
  Icon,
  Title,
  Text,
  ExternalLink,
  ContactForm,
  Container,
} from 'components/common'

import { socialLinks } from 'components/links'

const ContactPage = () => (
  <Layout title="Contact">
    <Container small>
      <Title>Contact</Title>
      <Text>
        My preferred way of contact is via{' '}
        <ExternalLink url="https://twitter.com/byurhanbeyzat">
          Twitter
        </ExternalLink>{' '}
        or <ExternalLink url="mailto:imbyurhan@gmail.com">Email</ExternalLink>.
        Feel free to contact me via{' '}
        <ExternalLink url="mailto:imbyurhan@gmail.com">
          imbyurhan@gmail.com
        </ExternalLink>{' '}
        or fill the form below.
      </Text>
      <IconsWrapper>
        <IconsList>
          {socialLinks &&
            socialLinks.map(({ id, link, name }) => (
              <IconsItem key={id}>
                <ExternalLink
                  url={link}
                  title={`Byurhan Beyzat on ${name}`}
                  aria-label={`Byurhan Beyzat on ${name}`}
                >
                  <Icon icon={name} width="32px" height="32px" />
                </ExternalLink>
              </IconsItem>
            ))}
        </IconsList>
      </IconsWrapper>
      <ContactForm />
    </Container>
  </Layout>
)

export default ContactPage

const IconsWrapper = styled.div`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-xl);
`

const IconsList = styled.ul`
  display: flex;
  place-items: center;
  justify-content: center;
`

const IconsItem = styled.li`
  &:not(:last-child) {
    margin-right: var(--space-lg);

    @media screen and (max-width: 400px) {
      margin-right: var(--space-md);
    }
  }

  a {
    cursor: pointer;
    color: var(--dark);
    transition: all 200ms ease;
    background: none;

    &:hover {
      color: var(--dark);
    }

    svg {
      fill: currentColor;
      transition: all 200ms ease;

      &:hover {
        transition: all 200ms ease;
        transform: scale(1.2);
      }
    }
  }
`
