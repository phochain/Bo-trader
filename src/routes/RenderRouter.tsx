import {lazy} from "react";
import {useRoutes} from "react-router-dom";
import LayoutComponents from "../layouts";
import appRoute from "./appRoute.ts";

const NotFound = lazy(() => import('../pages/not-found.tsx'))

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
    path: '*',
    element: <NotFound/>
  }
]
const RenderRouter = () => {
  return useRoutes(routes)
}

export default RenderRouter