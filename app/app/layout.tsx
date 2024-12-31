import type { Metadata } from "next";
import "styles/global.css";

export const metadata: Metadata = {
  title: "말랑한 블로그",
  description: "프론트엔드 개발자 임경훈의 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="APP-CONTAINER">{children}</body>
    </html>
  );
}
