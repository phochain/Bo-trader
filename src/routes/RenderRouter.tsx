import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import LayoutComponents from "../layouts";
import appRoute from "./appRoute.ts";

const NotFound = lazy(() => import('../pages/not-found.tsx'))
const GreetingsPage = lazy(() => import('../pages/greetings/index.tsx'))

const routes = [
  {
    path: '/',
    element: <LayoutComponents/>,
    children: [
      ...Object.values(appRoute).map(({path, component: Component}) => (
        {
          path,
          element: <Component/>
        }
      )),
    ]
  },
  {
    path: '/greetings/ref/:referrerId',
    element: <GreetingsPage/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
]
const RenderRouter = () => {
  return useRoutes(routes)
}

export default RenderRouter