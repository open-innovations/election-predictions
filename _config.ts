import lume from "lume/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import sheets from "lume/plugins/sheets.ts";

import oiLumeViz from "https://deno.land/x/oi_lume_viz@v0.15.6/mod.ts";
import { names } from "./colour.ts";

import autoDependency from "https://deno.land/x/oi_lume_utils@v0.4.0/processors/auto-dependency.ts";
import json from "lume/core/loaders/json.ts";

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
site.use(sheets());
site.use(oiLumeViz({
  colour: {
    names,
  },
}));
site.process([".html"], (pages) => pages.forEach(autoDependency));

site.loadData([".hexjson"], json);
site.use(base_path());

site.remoteFile(
  "assets/images/oi-logo.svg",
  "https://open-innovations.org/resources/images/logos/oi-square-black.svg",
);

site.copy("assets/fonts/");

export default site;
