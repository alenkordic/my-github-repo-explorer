import React from "react";
import SwitchMode from "../SwitchMode";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ThemeContext } from "./../../../contexts/theme.context";
import renderer from "react-test-renderer";


function switchTheme(darkMode: boolean) {
    const value = {
        toggleDarkMode: jest.fn(),
        darkMode: darkMode
      };
    return (
      <ThemeContext.Provider value={value}>
        <BrowserRouter>
          <SwitchMode />
        </BrowserRouter>
      </ThemeContext.Provider>
    );
  }
  
test("Dark is mode active", () => {
    render(switchTheme(true));
    expect(screen.getByText("Dark mode")).toBeTruthy();
  });

test("Light is mode active", () => {
    render(switchTheme(false));
    expect(screen.getByText("Light mode")).toBeTruthy();
  });

  // Snapshots
it("Switch Dark is mode render correctly", () => {
    const darkSwitch = switchTheme(true);
    const tree = renderer.create(darkSwitch).toJSON();
    expect(tree).toMatchSnapshot();
  });
it("Switch Light is mode render correctly", () => {
    const lightSwitch = switchTheme(false);
    const tree = renderer.create(lightSwitch).toJSON();
    expect(tree).toMatchSnapshot();
  });