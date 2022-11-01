import Header from 'components/header/header'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang='es'>
      <Head>
      </Head>
      <body>
        <Header></Header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}