import './index.styl'

# console.log( process:env:NODE_ENV )

import 'imba-router'

import Application from './application'
import Sketch as Header from './header'
import Sketch as Main from './main'
import Sketch as Footer from './footer'

Imba.mount <Application>

Imba.mount <Header>

Imba.mount <Main>

Imba.mount <Footer>
