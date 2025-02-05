import Atom from "react-loading-indicators/Atom";
import {Box} from "@chakra-ui/react";

const LoadingComponent = () => {
  return (
    <>
      <Box className='flex-box-center' minH={'100vh'}>
        <Atom color="#f0f64f" size="large" text="" textColor=""/>
      </Box>
    </>
  )
}

export default LoadingComponent