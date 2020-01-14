import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import { Title, Text, ExternalLink } from 'components/common'

const UsesPage = () => (
  <Layout title="Uses">
    <Title>Uses</Title>
    <Text>
      I&apos;m constantly improving and upgrading my setup, so expect changes on
      this page in the future.
    </Text>
    <ListHeading>Editor &#43; Terminal</ListHeading>
    <List>
      <li>
        <ExternalLink url="https://code.visualstudio.com/">
          Visual Studio Code
        </ExternalLink>{' '}
        is my current editor for almost everything.
      </li>
      <li>
        As a theme for VS Code I am using{' '}
        <ExternalLink url="https://marketplace.visualstudio.com/items?itemName=ngryman.codesandbox-theme">
          Codesandbox
        </ExternalLink>{' '}
        theme by Nicolas Gryman.
      </li>
      <li>
        The main font for VS Code is{' '}
        <ExternalLink url="https://dank.sh/">Dank Mono</ExternalLink> and{' '}
        <ExternalLink url="https://www.cufonfonts.com/font/menlo">
          Menlo
        </ExternalLink>{' '}
        for terminal.
      </li>
      <li>
        Currently using VS Code&apos;s integrated terminal during coding, for
        everything else{' '}
        <ExternalLink url="https://iterm2.com/">iTerm2</ExternalLink> with{' '}
        <ExternalLink url="https://fishshell.com/">Fish shell</ExternalLink> and{' '}
        <ExternalLink url="https://github.com/oh-my-fish/oh-my-fish">
          OhMyFish
        </ExternalLink>
        .
      </li>
      <li>
        You can see my settings (VS Code, iTerm2, Shell) on{' '}
        <ExternalLink url="https://github.com/byurhanbeyzat/dotfiles">
          .dotfiles
        </ExternalLink>{' '}
        repository on Github.
      </li>
    </List>
    <ListHeading>Desktop apps</ListHeading>
    <List>
      <li>
        Currently I&apos;m switching between{' '}
        <ExternalLink url="https://brave.com/">Brave Browser</ExternalLink> and{' '}
        <ExternalLink url="https://www.google.com/chrome/?brand=CHBD&gclsrc=ds&gclsrc=ds">
          Google Chrome
        </ExternalLink>{' '}
        and for some testing purposes I am using{' '}
        <ExternalLink url="https://www.mozilla.org/en-US/firefox/developer/">
          Firefox Developer Edition
        </ExternalLink>
        .
      </li>
      <li>
        I&apos;ve started integrating{' '}
        <ExternalLink url="https://www.alfredapp.com/">Alfred</ExternalLink> to
        my workflow.
      </li>
      <li>
        For todos, notes, planning and for everything else I&apos;m using{' '}
        <ExternalLink url="https://www.notion.so/">Notion</ExternalLink>.
      </li>
      <li>
        I am using{' '}
        <ExternalLink url="https://telegram.org/">Telegram</ExternalLink> and{' '}
        <ExternalLink url="https://www.sblack.online/">Sblack</ExternalLink> for
        messaging and{' '}
        <ExternalLink url="https://sparkmailapp.com/">Spark</ExternalLink> as a
        mail app.
      </li>
      <li>
        <ExternalLink url="https://justgetflux.com/">f.lux</ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://www.spotify.com/">Spotify</ExternalLink>
      </li>
      <li>
        For documents, presentations and tables I am using{' '}
        <ExternalLink url="https://www.google.com/drive/download/backup-and-sync/">
          Microsoft Office
        </ExternalLink>
        .
      </li>
      <li>
        I backup to local HDD and to{' '}
        <ExternalLink url="https://www.google.com/drive/">
          Google Drive
        </ExternalLink>{' '}
        for most files using{' '}
        <ExternalLink url="https://www.google.com/drive/download/backup-and-sync/">
          Google Drive Backup &amp; Sync
        </ExternalLink>
        .
      </li>
    </List>
    <ListHeading>Browser extensions</ListHeading>
    <List>
      <li>
        I am using{' '}
        <ExternalLink url="https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc?hl=en">
          VisBug
        </ExternalLink>
        , <ExternalLink url="https://getcssscan.com/">CSS Scan</ExternalLink>{' '}
        and <ExternalLink url="https://csspeeper.com/">CSS Pepper</ExternalLink>{' '}
        for page style preview or edit.
      </li>
      <li>
        <ExternalLink url="https://www.lastpass.com/">LastPass</ExternalLink>{' '}
        for secure password storing.
      </li>
      <li>
        <ExternalLink url="https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc">
          Octotree
        </ExternalLink>{' '}
        file tree as a sidebar for Github.
      </li>
      <li>
        <ExternalLink url="https://readermode.io/">Reader Mode</ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf?hl=en">
          Refined Github
        </ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://www.notion.so/web-clipper">
          Notion Web Clipper
        </ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en">
          React Developer Tool
        </ExternalLink>
      </li>
      <li>
        <ExternalLink url="https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm">
          Apollo Client Developer Tool
        </ExternalLink>
      </li>
    </List>
    <ListHeading>Hosting & Co.</ListHeading>
    <List>
      <li>
        <ExternalLink url="https://www.netlify.com/">Netlify</ExternalLink>{' '}
        &amp; <ExternalLink url="https://zeit.co/">Zeit Now</ExternalLink> for
        front-end hosting.
      </li>
      <li>
        <ExternalLink url="https://www.heroku.com/">Heroku</ExternalLink> for
        back-end hosting.
      </li>
      <li>
        <ExternalLink url="https://www.namecheap.com/">Namecheap</ExternalLink>{' '}
        as a domain provider.
      </li>
    </List>
    <ListHeading>Workstation Setup</ListHeading>
    <List>
      <li>Apple MacBook Air 13&apos; 2017</li>
      <li>Apple Magic Mouse 2</li>
      <li>BenQ 24&quot; inch monitor</li>
    </List>
    <blockquote>
      This page was inspired by{' '}
      <ExternalLink url="https://wesbos.com/uses/">WesBos</ExternalLink> and{' '}
      <ExternalLink url="https://kcd.im/uses/">Kent C. Dodds</ExternalLink>.
    </blockquote>
  </Layout>
)

export default UsesPage

const ListHeading = styled.h3`
  color: var(--grey700);
  margin-bottom: var(--space-xs);
`

const List = styled.ul`
  list-style-type: square;
  margin-bottom: var(--space-md);

  li {
    margin-left: var(--space-md);

    @media screen and (max-width: 560px) {
      margin-left: var(--space-sm);
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`
