import 'styles/global.css'
import { homeMetadata } from 'metadata'
import { ScreenController } from '../controller/ScreenController'

export const metadata = homeMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <ScreenController />
      <body className="APP-CONTAINER">{children}</body>
    </html>
  )
}
