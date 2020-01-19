import React from 'react'
import { Icon } from 'components/common'
import {
  CardLink,
  CardWrapper,
  CardTitle,
  CardDescription,
  CardDetails,
} from './styles'

const GithubCard = ({ data }) => (
  <CardLink url={data.url}>
    <CardWrapper>
      <CardTitle>{data.name}</CardTitle>
      <CardDescription>{data.description && data.description}</CardDescription>
      <CardDetails>
        <div>
          <span
            style={{
              backgroundColor: `${data.primaryLanguage &&
                data.primaryLanguage.color}`,
            }}
          />
          <p>{data.primaryLanguage && data.primaryLanguage.name}</p>
        </div>
        <span>
          <p>
            <Icon icon="Fork" /> {data.forkCount}
          </p>
          <p>
            <Icon icon="Star" />
            {data.stargazers.totalCount}
          </p>
        </span>
      </CardDetails>
    </CardWrapper>
  </CardLink>
)

export { GithubCard }
