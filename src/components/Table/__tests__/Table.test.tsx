import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Table from "../Table";

const tableProps = {
  repositories: {
    incomplete_results: 0,
    items: [
      {
        avatar: "https://avatars.githubusercontent.com/u/62653386?v=4",
        description: "Descriptio Lorem Ipsum Text",
        name: "my-github-repo-explorer",
        owner: "alenkordica",
        ownerType: "Private"
      }
    ],
    total_count: 100,
    duration: 1000
  },
  setPage: jest.fn(),
  setRowsPerPage: jest.fn(),
  rowsPerPage: 25,
  page: 1,
  responseTime: 1000
};

function renderTable() {
  return (
    <BrowserRouter>
      <Table
        repositories={tableProps.repositories}
        setPage={tableProps.setPage}
        setRowsPerPage={tableProps.setRowsPerPage}
        rowsPerPage={tableProps.rowsPerPage}
        page={tableProps.page}
        responseTime={tableProps.responseTime}
      />
    </BrowserRouter>
  );
}

// Snapshots
it("Table render correctly", () => {
  const table = renderTable();
  const tree = renderer.create(table).toJSON();
  expect(tree).toMatchSnapshot();
});
