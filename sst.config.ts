import type { SSTConfig } from "sst";
import { SvelteKitSite } from "sst/constructs";

export default {
  config() {
    return { name: "sitio-boda", region: "us-east-1" };
  },

  stacks(app) {
    app.stack(function Site({ stack }) {
      const { stage } = app;

      const domainName =
        stage === "production"
          ? "boda.grupovisual.org"
          : stage === "preview"
          ? "boda-preview.grupovisual.org"
          : undefined;

      const site = new SvelteKitSite(stack, "site", {
        customDomain: domainName && {
          domainName,
          hostedZone: "grupovisual.org",
        },

        // ⬇️  install devDependencies so `tsx` is present
        installCommand: "pnpm install --frozen-lockfile --prod=false",

        // keep your build command (plain shell assignment shown here)
        buildCommand: domainName
          ? `BASE_URL=https://${domainName} pnpm build`
          : "pnpm build",
      });

      stack.addOutputs({
        url: site.url,
        customDomainUrl: site.customDomainUrl ?? "—",
      });
    });
  },
} satisfies SSTConfig;
