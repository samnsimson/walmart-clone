import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const regex = /^US[0-9]+:\s+([a-z0-9]+( [a-z0-9]+)+)$/;

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: { "type-enum": [RuleConfigSeverity.Error, "always", ["regex"]] },
  defaultIgnores: true,
};

export default Configuration;
