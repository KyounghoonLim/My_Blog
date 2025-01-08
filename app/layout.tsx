import 'styles/global.css'
import { homeMetadata } from 'metadata'
import { ScreenController } from 'controllers/ScreenController'
import { NotionController } from 'controllers/NotionController'

export const metadata = homeMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ScreenController />
      <NotionController>
        <body className="APP-CONTAINER">{children}</body>
      </NotionController>
    </html>
  )
}
