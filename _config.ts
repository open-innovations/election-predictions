import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import favicon from "lume/plugins/favicon.ts";
const site = lume({
  src: "./src",
  // TODO Update this with the proper URL
  location: new URL("https://open-innovations.github.io/election-predictions/"),
});

site.use(metas());
site.use(postcss());
site.use(favicon({
  input: "assets/images/oi-logo.svg",
}));
site.use(base_path());

site.remoteFile(
  "assets/images/oi-logo.svg",
  "https://open-innovations.org/resources/images/logos/oi-square-black.svg",
);

export default site;
