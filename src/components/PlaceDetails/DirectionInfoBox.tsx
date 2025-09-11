import styled from 'styled-components'

import InfoBoxWrapper from './InfoBoxWrapper.tsx'

type Props = {
  directions: string
}

const Description = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  font-size: 12px;
  line-height: 1.5;
  color: #4a5565;
  gap: 6px;
`
const DirectionInfoBox = ({ directions }: Props) => {
  const splitDirections = directions
    .split('.')
    .map((d) => d.trim())
    .filter((d) => d.length > 0)

  return (
    <InfoBoxWrapper title={'가는방법'}>
      <Description>
        {splitDirections.map((d, i) => (
          <div key={i}>{`${i + 1}. ${d}`}</div>
        ))}
      </Description>
    </InfoBoxWrapper>
  )
}

export default DirectionInfoBox
