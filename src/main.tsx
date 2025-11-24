import { createRoot } from 'react-dom/client'
import App from 'src/App'
import { Provider } from 'react-redux'
import store from 'src/app/store/redux/reduxStore.tsx'

import 'src/styles/index.css'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
