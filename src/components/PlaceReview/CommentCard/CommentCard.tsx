// VisitCompletePage의 리뷰 내용
import styled from 'styled-components'

type Props = {
  text: string
  imageUrls?: string[]
}

export default function CommentCard({ text, imageUrls = [] }: Props) {
  if (!text && imageUrls.length === 0) return null

  return (
    <Box>
      {text && <Content>{text}</Content>}
      {imageUrls.length > 0 && (
        <ImgGrid>
          {imageUrls.map((url, i) => (
            <Img key={i} src={url} alt={`comment-img-${i}`} />
          ))}
        </ImgGrid>
      )}
    </Box>
  )
}

const Box = styled.div`
  margin: 12px 16px 0;
  background: #2e5aac;
  border-radius: 12px;
  padding: 12px;
  color: #fff;
`

const Content = styled.p`
  font-size: 14px;
  margin: 0 0 8px;
`

const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
`

const Img = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`
