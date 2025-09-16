import { Image as ImageIcon } from 'lucide-react'
import styled from 'styled-components'

import BackHeader from '@/components/Common/BackHeader'

type Props = {
  hasPermission: boolean
}

const SelectPost = ({ hasPermission }: Props) => {
  return (
    <Page>
      <BackHeader title="사진 불러오기 (최근 항목)" />

      {!hasPermission && (
        <>
          <NoticeBar>
            <NoticeText>
              모든 사진을 불러오려면 <br />
              앱의 관련 설정을 변경해 주세요.
            </NoticeText>

            <NoticeBtn>설정</NoticeBtn>
          </NoticeBar>

          <EmptyWrap>
            <ImageIcon size={110} strokeWidth={1} />
            <EmptyText>사진이 없습니다.</EmptyText>
          </EmptyWrap>
        </>
      )}
    </Page>
  )
}

export default SelectPost

const Page = styled.div`
  min-height: 100svh;
  background: #f3f5f7;
  display: flex;
  flex-direction: column;
`

const NoticeBar = styled.div`
  background: #0b3e82;
  color: #fff;
  padding: 16px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  font-weight: 500;
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
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;

  border-bottom: 1px solid white;
`

const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  svg {
    color: #000;
  }
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #111;
  font-weight: 600;
`
