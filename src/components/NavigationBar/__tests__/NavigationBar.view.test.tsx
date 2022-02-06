import React from "react";
import NavigationBarView from "../NavigationBar.view";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "./../../../contexts/auth.context";
import renderer from "react-test-renderer";

const user = {
  avatar_url: "https://avatars.githubusercontent.com/u/62653386?v=4",
  login: "alenkordica"
};

function renderNavigationBar(isAuth: boolean) {
  const value = {
    isAuthenticated: isAuth,
    logout: jest.fn(),
    login: jest.fn()
  };
  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <NavigationBarView isAuthenticated={isAuth} user={user} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

test("Navbar when user is NOT authenticated.", () => {
  render(renderNavigationBar(false));
  expect(screen.getByText("Login with GitHub")).toBeTruthy();
  expect(screen.getByText("Guest")).toBeTruthy();
  expect(screen.getByTestId("GitHubIcon")).toBeTruthy();
});

test("Navbar when user IS authenticated.", () => {
  render(renderNavigationBar(true));
  expect(screen.getByLabelText("Profile")).toBeTruthy();
  expect(screen.getByTestId("GitHubIcon")).toBeTruthy();
  const userNameTxt = user.login;
  expect(screen.getByText(userNameTxt)).toBeTruthy();
  expect(screen.getByAltText(userNameTxt)).toBeTruthy();
});

// Snapshots
it("Navbar NOT authenticated render correctly", () => {
  const guestNav = renderNavigationBar(false);
  const tree = renderer.create(guestNav).toJSON();
  expect(tree).toMatchSnapshot();
});
