import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import RenderRouter from "./RenderRouter.tsx";
import LoadingComponent from "../components/Loading";

const Routes = () => {
  return (
    <Suspense fallback={<LoadingComponent/>}>
      <BrowserRouter>
        <RenderRouter/>
      </BrowserRouter>
    </Suspense>
  )
}

export default Routes