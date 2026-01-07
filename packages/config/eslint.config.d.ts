import type { Linter } from "eslint";

declare module "@find-a-friend/config/eslint" {
  const config: Linter.Config;
  export default config;
}
