import { Provider } from 'react-redux'
import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { store } from '@/store';
import { Nav } from '@/components/navbar/Nav';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100','300','400','500','700','900'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) {
  
  return( 
<Provider store={store}>
<main className={roboto.className}>
    <Nav/> 
    <Component {...pageProps} />
    </main>
</Provider>
  )
}
