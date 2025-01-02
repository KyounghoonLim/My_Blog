import clsx from 'clsx'
import { useTypedJs } from 'hooks/useTypedJs'
import { Do_Hyeon } from 'next/font/google'

const font = Do_Hyeon({ weight: '400' })

export function HomePage_1() {
  const { typedJsRef } = useTypedJs({
    stringsElement: '#introduce',
  })

  return (
    <section className="CONTENT-CONTAINER h-dscreen">
      <div id="introduce">
        <h1>{`말랑한 블로그에 오신걸 환영합니다.^1000\n저는 프론트엔드 개발자 임경훈입니다.`}</h1>
      </div>
      <span
        ref={typedJsRef}
        className={clsx('typograph-32 tablet:typograph-48 typedJs', font.className)}
      ></span>
    </section>
  )
}
