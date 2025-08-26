import { Camera } from 'lucide-react'
import { useRef, useState } from 'react'
import styled from 'styled-components'

type Props = {
  onChange: (file: File) => void
}

const Wrapper = styled.button`
  width: 100px;
  height: 100px;
  border: 1px solid #b3b3b3;
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 11px;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CameraIcon = styled(Camera)`
  width: 24px;
  height: 24px;
  color: #b3b3b3;
`

const HiddenInput = styled.input`
  display: none;
`

const PhotoUploadButton = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null) // 미리보기 URL

  //버튼 클릭 시 input 클릭되게
  const handleClick = () => {
    inputRef.current?.click()
  }

  // 파일을 선택했을 때
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onChange(file) //부모한테 전달
    }
  }

  return (
    <Wrapper onClick={handleClick}>
      {preview && <PreviewImg src={preview} alt="사진 미리보기" />}
      {!preview && (
        <>
          <CameraIcon />
          사진을
          <br /> 등록하세요
        </>
      )}
      <HiddenInput type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} />
    </Wrapper>
  )
}

export default PhotoUploadButton
