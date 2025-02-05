import {useEffect, useState} from "react";
import {Box, Image} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const HeaderGreetings = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        backgroundColor={scrolling ? '#02142b' : 'transparent'}
        transition="background-color 0.2s"
        padding="30px"
        zIndex={1000}
      >
        <Link to={"/"}>
          <Image src={'/assets/img/logoPage/logoWeb.svg'}
                 width={'90px'}
                 height={'32px'}
          />
        </Link>
      </Box>
    </>
  )
}

export default HeaderGreetings