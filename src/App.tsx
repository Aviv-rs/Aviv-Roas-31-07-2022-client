import { AppHeader } from 'cmps/app-header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from 'routes'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <main className="layout-padding main-content full-screen">
          <Routes>
            {routes.map(el => (
              <Route key={el.path} path={el.path} element={el.element} />
            ))}
          </Routes>
        </main>
      </Router>
    </div>
  )
}
