// src/components/Common/BottomNavBar.tsx
import { Map, MapPin, Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

type Item = { key: string; icon: ReactNode; label: string }
type Props = {
  items?: Item[]
  activeKey: string
  onChange?: (key: string) => void
}

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

const Tile = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? ACTIVE_BG : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#374151')};

  &:not([data-active='true']):hover {
    background: #f9fafb;
  }
  &:active {
    opacity: 0.95;
  }

  .ico {
    width: 24px;
    height: 24px;
    display: block;
    color: ${({ $active }) => ($active ? '#ffffff' : '#9ca3af')};
  }
  .txt {
    font-size: 12px;
    font-weight: 600;
    color: ${({ $active }) => ($active ? '#ffffff' : '#6b7280')};
  }
`

export const BottomGap = styled.div`
  height: calc(64px + 16px + env(safe-area-inset-bottom));
`

const BottomNavBar = ({ items, activeKey, onChange }: Props) => {
  const fallback: Item[] = [
    { key: 'find', icon: <MapPin />, label: '장소 찾기' },
    { key: 'map', icon: <Map />, label: '나만의 캠퍼스 맵' },
    { key: 'me', icon: <Settings />, label: '마이페이지' },
  ]
  const list = items?.length ? items : fallback

  return (
    <Shell role="navigation" aria-label="하단 네비게이션">
      <Row>
        {list.map((it) => {
          const active = it.key === activeKey
          return (
            <Tile
              key={it.key}
              $active={active}
              data-active={active ? 'true' : undefined}
              onClick={() => onChange?.(it.key)}
              aria-current={active ? 'page' : undefined}
            >
              <span className="ico">{it.icon}</span>
              <span className="txt">{it.label}</span>
            </Tile>
          )
        })}
      </Row>
    </Shell>
  )
}

export default BottomNavBar
