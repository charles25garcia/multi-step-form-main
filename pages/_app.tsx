// Dependencies
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

// Redux
import { StepStore } from '@core/redux'

// Layouts
import { MultiStepLayout } from '../layouts'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={StepStore}>
      <MultiStepLayout><Component {...pageProps} /></MultiStepLayout>
    </Provider>
  )
}
