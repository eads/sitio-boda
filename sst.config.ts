import type { SSTConfig } from "sst";
import { SvelteKitSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "sitio-boda",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const stage = app.stage;

      let customDomain;
      if (stage === "production") {
        // For production stage
        customDomain = {
          domainName: "boda.grupovisual.org",
          hostedZone: "grupovisual.org",
        };
      } else if (stage === "preview") {
        // For preview stage
        customDomain = {
          domainName: "boda-preview.grupovisual.org",
          hostedZone: "grupovisual.org",
        };
      }

      const site = new SvelteKitSite(stack, "site", { customDomain });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;