import Button from 'components/Button'
import ChapterHeader from 'components/ChapterHeader'
import { Container } from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import { HeartOutlineIcon, SlideIcon } from 'components/Icons'
import Menu from 'components/Menu'
import Summary from 'components/Summary'
import TextBoxInput from 'components/TextBoxInput'
import TextContent from 'components/TextContent'
import TextContentMock from 'components/TextContent/mock'
// import useSticky from 'hooks/useSticky'
import { useEffect, useRef, useState } from 'react'
import * as S from './styles'

export type HomeTemplateProps = {
  numberOfChapters?: number
}

const Home = ({ numberOfChapters }: HomeTemplateProps) => {
  const [isSticky, setIsSticky] = useState(false)
  const [stickyHeight, setStickyHeight] = useState(0)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const headerRef = useRef<HTMLBodyElement>(null)
  const summaryRef = useRef<HTMLBodyElement>(null)

  const chaptersRef = useRef<HTMLElement[] | null>(null)
  chaptersRef.current = Array(numberOfChapters)

  // const handleScroll = (e) => {
  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
  //   console.log('olha o target.scrollHeight', e.target.scrollHeight)
  //   console.log('olha o e.target.scrollTop', e.target.scrollTop)
  //   if (bottom) {
  //     console.log('cheguei no fim')
  //     setIsSticky(false)
  //   }
  // }

  useEffect(() => {
    window.onscroll = () => {
      console.log(focusedIndex)
      if (
        headerRef.current &&
        window.pageYOffset > headerRef.current?.clientHeight * 0.7 &&
        isSticky === false
      ) {
        setIsSticky(true)
        setStickyHeight(
          summaryRef.current
            ? summaryRef?.current?.offsetTop - window.pageYOffset
            : 170
        )
        // chaptersRef?.current?.map(
        //   (chapter) => window.pageYOffset > chapter.clientHeight
        // )
      } else if (
        headerRef.current &&
        window.pageYOffset < headerRef.current?.clientHeight * 0.7
      ) {
        setIsSticky(false)
      } else {
        if (chaptersRef?.current) {
          console.log('Olha o chaptersRef: ', chaptersRef?.current)
          for (let i = 0; i < chaptersRef.current.length; i++) {
            if (chaptersRef.current[i]) {
              console.log(
                `esse eh o index ${i}`,
                chaptersRef.current[i].clientHeight
              )
              if (
                chaptersRef.current[i + 1] &&
                window.pageYOffset > chaptersRef.current[i].clientHeight &&
                window.pageYOffset < chaptersRef.current[i + 1].clientHeight
              ) {
                console.log('consid????o 1', chaptersRef.current[i].clientHeight)
                setFocusedIndex(i)
              } else if (
                i === chaptersRef.current.length - 1 &&
                window.pageYOffset > chaptersRef.current[i].clientHeight
              ) {
                console.log('consid????o 2', chaptersRef.current[i].clientHeight)
                setFocusedIndex(i)
              }
            }
          }
        }
      }
    }
  })

  return (
    <>
      <S.Header ref={headerRef}>
        <Container>
          <Menu />
          <S.HeaderTitle>
            <Header
              title={'Lideran??a 4.0'}
              category={'Lideran??a'}
              author={'Thomaz Lira Gomes'}
              publicationDate={new Date()}
              timeReading={10000000}
              imageUrl={'/img/header.png'}
            />
          </S.HeaderTitle>
        </Container>
      </S.Header>
      <Container>
        <S.BodyGrid>
          <S.Summary ref={summaryRef}>
            <Summary
              topics={[
                'Lideran??a inspiradora',
                'Lideran??a remota: 3 fatores para o sucesso de equipes ?? dist??ncia',
                'O futuro do anywhere office',
                'Metaverso: por onde come??ar',
                'Mindset de crescimento: como identificar agentes da mudan??a ',
                'Profissionais T-shaped'
              ]}
              focusedIndex={0}
              sticky={isSticky}
              stickyHeight={stickyHeight}
            />
          </S.Summary>
          <div>
            <TextContent
              title={TextContentMock.title}
              content={TextContentMock.content}
            />

            <S.ButtonGrid>
              <Button icon={<HeartOutlineIcon />} outline={true}>
                curtir cap??tulo
              </Button>
              <div></div>
              <Button
                icon={<SlideIcon />}
                minimal={true}
                // style={{ justifyContent: 'right' }}
              >
                adicionar cap??tulo ao meu slide
              </Button>
            </S.ButtonGrid>
            <div style={{ padding: '3.2rem' }}>
              <TextBoxInput
                label={'Feedback'}
                placeholder={'Compartilhe aqui o que achou deste cap??tulo...'}
              />
            </div>
            <S.ChapterContainer ref={(e) => e && chaptersRef.current?.push(e)}>
              <ChapterHeader
                title={'Lideran??a remota:'}
                numberOfChapter={2}
                imageUrl={'/img/chapter01.png'}
                subtitle={'3 fatores para o sucesso de equipes ?? dist??ncia'}
              />
            </S.ChapterContainer>
            <TextContent
              title={TextContentMock.title}
              content={TextContentMock.content}
            />
          </div>
        </S.BodyGrid>
      </Container>
      <Container>
        <div style={{ marginTop: '10rem' }}>
          <Footer />
        </div>
      </Container>
    </>
  )
}

export default Home
