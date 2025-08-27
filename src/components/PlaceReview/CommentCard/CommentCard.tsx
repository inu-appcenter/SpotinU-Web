// VisitCompletePage의 리뷰 내용
import styled from 'styled-components'

type Props = {
  text?: string
  imageUrls?: string[]
  /** 사진 위치: 기본 'left', 완료페이지용 'right' */
  imagePosition?: 'left' | 'right'
}

export default function CommentCard({ text = '', imageUrls = [], imagePosition = 'left' }: Props) {
  const first = imageUrls[0]
  const moreCount = imageUrls.length > 1 ? imageUrls.length - 1 : 0
  const reverse = imagePosition === 'right'

  if (!text && imageUrls.length === 0) return null

  return (
    <Card>
      <Row $reverse={reverse}>
        {/* 텍스트 */}
        {text && <TextBox>{text}</TextBox>}

        {/* 이미지 */}
        {first && (
          <ThumbWrap>
            <Thumb src={first} alt="" />
            {moreCount > 0 && <MoreBadge>+{moreCount}</MoreBadge>}
          </ThumbWrap>
        )}
      </Row>
    </Card>
  )
}

const Card = styled.div`
  padding: 12px;
  color: #fff;

  margin: 12px 12px 0;
  background: #4f74a2;
  border-radius: 12px;
  margin-bottom: 8px;
`

const Row = styled.div<{ $reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  align-items: stretch;
  gap: 10px;
`

const TextBox = styled.p`
  flex: 1;
  margin: 0;
  line-height: 1.4;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-word;

  max-height: 100px;
  overflow-y: auto;
  padding-right: 6px;
`

const ThumbWrap = styled.div`
  position: relative;
  flex: 0 0 112px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
`

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const MoreBadge = styled.span`
  position: absolute;
  right: 6px;
  bottom: 6px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 10px;
`
