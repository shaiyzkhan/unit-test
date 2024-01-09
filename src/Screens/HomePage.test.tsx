import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";

const records = [
  {
    title: "Book 1",
    author: "Author 1",
    published_date: "2022-01-01",
    created_date: "",
    update_date: "",
  },
  {
    title: "Book 2",
    author: "Author 2",
    published_date: "2022-02-01",
    created_date: "",
    update_date: "",
  },
];

const mockUpdateRecord = jest.fn();
const mockAddRecord = jest.fn();

describe("Home Page", () => {
  test("It renders correctly", () => {
    const screen = render(
      <BrowserRouter>
        <ToastProvider>
          <HomePage
            addRecord={mockAddRecord}
            records={records}
            editRecord={mockUpdateRecord}
            success={false}
          />
        </ToastProvider>
      </BrowserRouter>
    );
    expect(screen.baseElement).toBeTruthy();
  });
});
