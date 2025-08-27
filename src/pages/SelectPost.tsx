import { Image as ImageIcon } from 'lucide-react'
import styled from 'styled-components'

type Props = {
  hasPermission: boolean
  onOpenSettings?: () => void
  onBack?: () => void
}

export default function SelectPost({ hasPermission, onOpenSettings }: Props) {
  return (
    <Page>
      <Header>
        <Title>사진 불러오기 (최근 항목)</Title>
        <div style={{ width: 22 }} />
      </Header>

      {!hasPermission && (
        <>
          <NoticeBar>
            <NoticeText>
              모든 사진을 불러오려면 <br />
              앱의 관련 설정을 변경해 주세요.
            </NoticeText>
            <NoticeBtn onClick={onOpenSettings}>설정</NoticeBtn>
          </NoticeBar>

          <EmptyWrap>
            <ImageIcon size={110} strokeWidth={0.5} />
            <EmptyText>사진이 없습니다.</EmptyText>
          </EmptyWrap>
        </>
      )}
    </Page>
  )
}

const Page = styled.div`
  min-height: 100dvh;
  background: #f6f8fb;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 80px;
  padding: 0 12px;
  display: flex;
  align-items: center;

  background: #fff;
  border-bottom: 1px solid #e7eaf0;
  justify-content: center;
  position: relative;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`

const NoticeBar = styled.div`
  background: #0b3e82;
  color: #fff;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  font-weight: 500;
  height: 76px;
`

const NoticeText = styled.span`
  font-size: 14px;
  line-height: 1.35;
  opacity: 0.95;
`

const NoticeBtn = styled.button`
  border: 0;
  background: transparent;
  color: #fff;
  font-weight: 500;
  font-size: 13.5px;
  cursor: pointer;
  border-bottom: 1px solid #e5e8eb;
`

const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 36px;
  gap: 8px;

  svg {
    color: #000000ff;
  }
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #111;
  font-weight: 600;
`
