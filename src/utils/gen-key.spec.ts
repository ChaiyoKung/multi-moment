import { describe, expect, it } from "vitest";
import { genKey } from "./gen-key";

describe(genKey.name, () => {
  it('should be "multimoment.key" when not assign option param', () => {
    const result = genKey("key");
    expect(result).toBe("multimoment.key");
  });

  it('should be "app.key" when namespace="app"', () => {
    const result = genKey("key", { namespace: "app" });
    expect(result).toBe("app.key");
  });

  it('should be "multimoment-key" when separator="-"', () => {
    const result = genKey("key", { separator: "-" });
    expect(result).toBe("multimoment-key");
  });

  it('should be "app-key" when namespace="app" and separator="-"', () => {
    const result = genKey("key", { namespace: "app", separator: "-" });
    expect(result).toBe("app-key");
  });
});
