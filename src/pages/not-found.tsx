import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box borderTop={'2px solid #000'}>
      <main className="bsod container--">
        <h1 className="neg title">
          <span className="bg">Error - 404</span>
        </h1>
        <p>An error has occurred, to continue:</p>
        <p>
          * Return to our homepage.<br />
          * Send us an e-mail about this error and try later.
        </p>
        <nav className="nav">
          <Link
            to="/"
            style={{ background: '#aaa', padding: '0 15px 2px 13px', marginTop: '20px' }}
          >
            Home Page
          </Link>
        </nav>
      </main>
    </Box>
  );
};

export default NotFound;