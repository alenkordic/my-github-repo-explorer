import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

import SearchInputField from "../SearchInputField";


it("SearchInput renders correctly", ()=>{
    const { getByPlaceholderText} = render(<SearchInputField onChange={jest.fn()} value=""/>)
    expect(getByPlaceholderText("Github repository name")).toBeTruthy()
})

describe("Input value", ()=> {
    it("updates on change", () =>{
        const {getByPlaceholderText} = render(<SearchInputField onChange={jest.fn()} value=""/>)
        // eslint-disable-next-line prettier/prettier
        const searchInput:HTMLInputElement = (getByPlaceholderText("Github repository name") as HTMLInputElement)

        fireEvent.change(searchInput, { target: {value: "test"}})
        expect(searchInput.value).toBe("test")
    })
})

// Snapshots
it("Logout btn render correctly", () => {
    const tree = renderer.create(<SearchInputField onChange={jest.fn()} value=""/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  