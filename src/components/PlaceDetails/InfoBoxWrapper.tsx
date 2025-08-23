import type { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  icon?: ReactNode
  seeAll?: ReactNode
  children: ReactNode
}

const Box = styled.div`
  padding: 14px;
  background-color: white;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
`
const TitleRow = styled.div`
  display: flex;
  margin-bottom: 6px;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  gap: 4px;
  color: black;
  display: flex;
`
const IconWrapper = styled.div`
  top: 1px;
  display: inline-flex;
  position: relative;
`

const InfoBoxWrapper = ({ title, icon, seeAll, children }: Props) => {
  return (
    <Box>
      <TitleRow>
        <Title>
          <IconWrapper>{icon}</IconWrapper>
          {title}
        </Title>
        {seeAll && seeAll}
      </TitleRow>
      {children}
    </Box>
  )
}

export default InfoBoxWrapper
