import { Island } from './Island'
import Image from 'next/image'
import ImageProfile from 'images/profile_img.png'
import IconMobile from 'icons/icon_mobile.svg'
import IconMail from 'icons/icon_mail.svg'
import IconGithub from 'icons/icon_github.svg'
import Link from 'next/link'

export function Island_Resume() {
  return (
    <Island className="flex flex-col gap-4 w-[330px] h-[450px]">
      <div className="w-full flex gap-4">
        <Image
          src={ImageProfile}
          width={120}
          height={160}
          sizes=""
          alt="임경훈"
          quality={100}
          priority
          placeholder="blur"
        />
        <div className="flex flex-col gap-2 py-2">
          <span className="typograph-14 text-neutral-600">Contact</span>
          <div className="flex flex-col gap-2 pl-1">
            <div className="flex items-center gap-2">
              <IconMobile width={16} height={16} viewBox="0 0 14 14" />
              <Link
                href={'tel:010-2667-0132'}
                className="typograph-13 text-neutral-700 underline underline-offset-2"
              >
                010-2667-0132
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <IconMail width={16} height={16} viewBox="0 0 14 14" />
              <Link
                href={'mailto:mogies@naver.com'}
                className="typograph-13 text-neutral-700 underline underline-offset-2"
              >
                mogies@naver.com
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <IconGithub width={16} height={16} viewBox="0 0 14 14" />
              <Link
                href={'https://github.com/KyounghoonLim'}
                target="_blank"
                className="typograph-13 text-neutral-700 underline underline-offset-2"
              >
                LKH
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="typograph-14 text-neutral-600">Introduce</span>
        <p className="typograph-13 !leading-5 break-keep px-1">
          webGL 라이브러리를 사용해(Three.js, Babylon.js) kikiz, kikitown 서비스를 개발했습니다.
          <br />
          사용자 인터렉션에 따른 동적 화면을 개발하는 것에 강점이 있으며, 주로 React.js, Next.js 를
          사용해서 개발합니다.
          <br />
          <br />
          동료들과 즐겁게 일하는 것을 가장 중요한 가치로 생각하고 있습니다.
        </p>
      </div>
      <Link
        href={'https://notion.hoon2.me'}
        target="_blank"
        className="typograph-14 text-neutral-600 self-end mt-auto underline underline-offset-2"
      >{`see detail`}</Link>
    </Island>
  )
}
