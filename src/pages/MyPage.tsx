import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useAuthContext } from '@/hooks/useAuthContext'
import styled from 'styled-components'

export default function MyPage() {
  const { isAuthenticated } = useAuthContext()
  const { logout } = useAuth()
  return (
    <Wrap>
      <Content>
        <Title>My Page</Title>

        <Card>
          {!isAuthenticated && (
            <Row to="/login">
              <Left>로그인 / 회원가입</Left>
              <Right>
                <ChevronRight size={24} />
              </Right>
            </Row>
          )}
          {isAuthenticated && (
            <>
              <Row to="/reviews/history">
                <Left>작성 후기 수정 / 최근 기록</Left>
                <Right>
                  <ChevronRight size={24} />
                </Right>
              </Row>
              <Row to="/profile">
                <Left>프로필 수정 및 회원탈퇴</Left>
                <Right>
                  <ChevronRight size={24} />
                </Right>
              </Row>
              <Row to="/" onClick={logout}>
                <Left>로그아웃</Left>
                <Right>
                  <ChevronRight size={24} />
                </Right>
              </Row>
            </>
          )}
        </Card>
      </Content>
    </Wrap>
  )
}

const Wrap = styled.main`
  --gutter: 16px;
  min-height: 100svh;
  background: #fff;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  padding: 48px var(--gutter) 32px;
`

const Title = styled.h1`
  font-size: 21px;
  font-weight: 800;
  margin: 80px 0 50px;
`

const Card = styled.section`
  background: #fff;
  border: none;
`

const Row = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0;
  text-decoration: none;
  color: inherit;

  &::after {
    content: '';
    position: absolute;
    left: calc(-1 * var(--gutter));
    right: calc(-1 * var(--gutter));
    bottom: 0;
    height: 1px;
    background: #eceff3;
  }
`

const Left = styled.span`
  font-size: 17px;
  font-weight: 600;
`

const Right = styled.span`
  display: flex;
  align-items: center;
`
