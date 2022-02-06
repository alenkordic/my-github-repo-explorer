import React from "react";
import Loader from "../Loader";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

test("Loader renders well", () => {
  render(<Loader text="Loader testing" />);
  expect(screen.getByText("Loader testing")).toBeTruthy();
});

//Snapshots
it("Loader checked", () => {
  const tree = renderer.create(<Loader />).toJSON();
  expect(tree).toMatchSnapshot();
});
