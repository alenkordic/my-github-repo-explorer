import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import LoginButton from "../LoginButton";
import { AuthContext } from "../../../contexts/auth.context";

function getBtn(isAuth: boolean) {
  const value = {
    isAuthenticated: isAuth,
    logout: jest.fn(),
    login: jest.fn()
  };
  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <LoginButton />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

test("Login btn when user is not authenticated.", () => {
  render(getBtn(false));
  expect(screen.getByText("Login with GitHub")).toBeTruthy();
});

test("Logout btn when user is authenticated.", () => {
  render(getBtn(true));
  expect(screen.getByText("Logout")).toBeTruthy();
});

// Snapshots
it("Login btn render correctly", () => {
  const loginBtn = getBtn(false);
  const tree = renderer.create(loginBtn).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Logout btn render correctly", () => {
  const logoutBtn = getBtn(true);
  const tree = renderer.create(logoutBtn).toJSON();
  expect(tree).toMatchSnapshot();
});
