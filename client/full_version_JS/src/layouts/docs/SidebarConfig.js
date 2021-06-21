// routes
import { PATH_DOCS } from "../../routes/paths";
// components
import Label from "../../components/Label";

// ----------------------------------------------------------------------

const version = "v2.0.0";

const sidebarConfig = [
  {
    subheader: "getting started",
    items: [
      { title: "Sign In", href: PATH_DOCS.started },
      { title: "Sign Up", href: PATH_DOCS.package },
    ],
  },
];

export default sidebarConfig;
