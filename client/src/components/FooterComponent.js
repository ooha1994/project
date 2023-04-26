import React from "react";
import { Box, Container } from "./FooterStyles";

const FooterComponent = () => {
  return (
    <Box>
      <Container>
        <div className="text-center p-3">
          {" "}
          <b>&copy; {new Date().getFullYear()} Copyright: </b>
          University of Central Missouri. All rights reserved
          {/* <a className="text-dark" href="">
            SimplyBook.com
          </a> */}
        </div>
      </Container>
    </Box>
  );
};
export default FooterComponent;
