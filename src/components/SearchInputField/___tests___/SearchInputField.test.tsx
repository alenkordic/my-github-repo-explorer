import React from "react";
import SearchInputField from "../SearchInputField";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";


it("SearchInput renders correctly", ()=>{
    const { getByPlaceholderText} = render(<SearchInputField onChange={jest.fn()} value=""/>)
    expect(getByPlaceholderText("Github repository name")).toBeTruthy()
})

describe("Input value", ()=> {
    it("updates on change", () =>{
        const {getByPlaceholderText} = render(<SearchInputField onChange={jest.fn()} value=""/>)
        const searchInput = (getByPlaceholderText("Github repository name")as HTMLInputElement)

        fireEvent.change(searchInput, { target: {value: "test"}})
        expect(searchInput.value).toBe("test")
    })
})

//Snapshots
it("Logout btn render correctly", () => {
    const tree = renderer.create(<SearchInputField onChange={jest.fn()} value=""/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  