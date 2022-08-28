import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang='es'>
      <Head>
        {/* <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" /> PyScript */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}