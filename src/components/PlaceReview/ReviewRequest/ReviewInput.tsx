// 사진 + 코멘트
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  photos: (File | string)[]
  comment: string
  maxLength?: number
  onChange: (p: (File | string)[], c: string) => void
}

const Wrap = styled.section`
  display: grid;
  gap: 24px;
  padding-inline: clamp(2px, 5vw, 9px);
`

// 업로드 박스
const UploadBox = styled.button`
  width: 100%;
  min-height: 180px;
  border-radius: 16px;
  border: 1px dashed #c8cfd9;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    opacity: 0.9;
  }
`

const UploadInner = styled.div`
  text-align: center;

  color: #222;
  > .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 26px;
  }
  > .plus {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000000ff;
    border-radius: 50%;
    font-size: 18px;
    line-height: 1;
    margin-bottom: 26px;
  }
`

// 미리보기 영역(있을 때만 노출됨)
const PreviewStrip = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
`

const Thumb = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 10px;
  overflow: hidden;
  flex: 0 0 auto;
  background: #d9d9d9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  color: #ffffffff;
  background: rgba(0, 0, 0, 0.55);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

// 텍스트 박스
const TextCard = styled.div`
  border-radius: 16px;
  background: #d9d9d9;
  border: 1px solid #e6eaf2;
  padding: 14px;
`

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: #8b8888;
  &:before {
    content: '✎ ';
  }
`

const Textarea = styled.textarea`
  width: 100%;
  font-size: 12px;
  line-height: 1.5;
  min-height: 90px;
  margin-top: 12px;

  border: none;
  outline: none;
  resize: none;
  background: transparent;
`

const Counter = styled.div<{ $danger?: boolean }>`
  text-align: right;
  font-size: 12px;
  color: ${({ $danger }) => ($danger ? '#a6363aff' : '#8a94a6')};
`

const ReviewInput = ({ photos, comment, maxLength = 400, onChange }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)

  // 파일 선택 트리거
  const openPicker = () => fileRef.current?.click()

  // 파일 추가
  const appendFiles = (list: FileList | null) => {
    if (!list) return
    const next = [...photos, ...Array.from(list)]
    onChange(next, comment)
  }

  // 파일 제거
  const removeAt = (idx: number) => {
    const next = photos.filter((_, i) => i !== idx)
    onChange(next, comment)
  }

  // 코멘트 변경
  const onComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value.slice(0, maxLength)
    onChange(photos, v)
  }

  // 미리보기 URL 배열 만들기
  const previews = useMemo(
    () =>
      photos.map(
        (f) =>
          typeof f === 'string'
            ? { url: f, type: 'image' } // 문자열(URL)인 경우 그대로
            : { url: URL.createObjectURL(f), type: f.type }, // File인 경우 createObjectURL
      ),
    [photos],
  )

  useEffect(() => {
    // 메모리 누수 방지
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url))
  }, [previews])

  // 드래그&드롭(선택)
  const onDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    appendFiles(e.dataTransfer.files)
  }
  const prevent: React.DragEventHandler<HTMLButtonElement> = (e) => e.preventDefault()

  return (
    <Wrap>
      <UploadBox
        type="button"
        onClick={openPicker}
        onDrop={onDrop}
        onDragOver={prevent}
        aria-label="사진을 추가하세요"
      >
        <UploadInner>
          <div className="title">사진을 추가해 주세요</div>
          <div className="plus">+</div>
        </UploadInner>
        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={(e) => appendFiles(e.target.files)}
        />
      </UploadBox>

      {previews.length > 0 && (
        <PreviewStrip>
          {previews.map((p, i) => (
            <Thumb key={i}>
              {p.type.startsWith('video') ? (
                <video src={p.url} muted />
              ) : (
                <img src={p.url} alt={`upload-${i}`} />
              )}
              <RemoveBtn type="button" onClick={() => removeAt(i)} aria-label="삭제">
                ×
              </RemoveBtn>
            </Thumb>
          ))}
        </PreviewStrip>
      )}

      <TextCard>
        <Label>리뷰를 작성해 주세요</Label>
        <Textarea
          value={comment}
          onChange={onComment}
          placeholder="리뷰 작성 시 유의사항 한 번  확인하기!
욕설, 비방, 명예훼손성 표현을 삼가주세요."
          maxLength={maxLength}
        />
        <Counter $danger={comment.length > maxLength}>
          {comment.length}/{maxLength}
        </Counter>
      </TextCard>
    </Wrap>
  )
}

export default ReviewInput
