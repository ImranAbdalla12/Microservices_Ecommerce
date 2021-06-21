import PropTypes from "prop-types";
import { useState } from "react";
// material
import { Container, Box, Hidden } from "@material-ui/core";
//
import DocsSidebar from "./DocsSidebar";
import DocsNavbar from "./DocsNavbar";
import Shop from "../../views/EcommerceShop";

// ----------------------------------------------------------------------

DocsLayout.propTypes = {
  children: PropTypes.node,
};

export default function DocsLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100%", overflow: "hidden" }}>
      <DocsNavbar onOpenSidebar={() => setOpen(true)} />
      <Hidden>
        <DocsSidebar
          onCloseSidebar={() => setOpen(false)}
          isOpenSidebar={open}
        />
      </Hidden>

      <Container
        maxWidth="lg"
        sx={{
          my: 15,
          flexGrow: 1,
          overflow: "auto",
          minHeight: "100%",
        }}
      >
        <Shop />
      </Container>
    </Box>
  );
}
