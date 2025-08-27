// src/components/Common/BottomNavBar.tsx
import { Map, MapPin, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const ACTIVE_BG = '#073B7B'

const Shell = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100vw, 430px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-top: 1px solid #f3f4f6;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  z-index: var(--z-bottom-bar, 60);
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
`

/* NavLink 기반으로, .active 클래스에만 스타일 주기 */
const Tile = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 12px;
  text-decoration: none;

  background: transparent;
  color: #374151;

  .ico {
    width: 24px;
    height: 24px;
    color: #9ca3af;
  }
  .txt {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
  }

  &:hover {
    background: #f9fafb;
  }
  &:active {
    opacity: 0.95;
  }

  &.active {
    background: ${ACTIVE_BG};
    color: #fff;
    .ico {
      color: #fff;
    }
    .txt {
      color: #fff;
    }
  }
`

export const BottomGap = styled.div`
  height: calc(64px + 16px + env(safe-area-inset-bottom));
`

const NAV = [
  { key: 'places', label: '장소 찾기', path: '/' },
  { key: 'myCampusMap', label: '나만의 캠퍼스 맵', path: '/my-campus-map' },
  { key: 'myPage', label: '마이페이지', path: '/my-page' },
]

const BottomNavBar = () => {
  return (
    <Shell role="navigation" aria-label="하단 네비게이션">
      <Row>
        <Tile to={NAV[0].path} end>
          {' '}
          {/* "/"는 exact 매칭 필요 → end */}
          <span className="ico">
            <MapPin />
          </span>
          <span className="txt">{NAV[0].label}</span>
        </Tile>
        <Tile to={NAV[1].path}>
          <span className="ico">
            <Map />
          </span>
          <span className="txt">{NAV[1].label}</span>
        </Tile>
        <Tile to={NAV[2].path}>
          <span className="ico">
            <Settings />
          </span>
          <span className="txt">{NAV[2].label}</span>
        </Tile>
      </Row>
    </Shell>
  )
}

export default BottomNavBar
