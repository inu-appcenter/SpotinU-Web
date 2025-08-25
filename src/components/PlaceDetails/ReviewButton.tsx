import styled from 'styled-components'

const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  color: white;
  background: #073b7b;
  border-radius: 20px;
`

type Props = {
  isLogin: boolean
  onClickLogin: () => void
  onClickReview: () => void
}

export default function ReviewButton({ isLogin, onClickLogin, onClickReview }: Props) {
  return <Button onClick={isLogin ? onClickReview : onClickLogin}>이용후기 등록</Button>
}
