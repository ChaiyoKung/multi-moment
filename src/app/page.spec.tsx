import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe(Home.name, () => {
  it("should be render", () => {
    render(<Home />);
    expect(screen.findByText("MultiMoment")).toBeDefined();
  });
});
