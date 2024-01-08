import { render, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import userEvent from '@testing-library/user-event';

const records = [
  { title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', created_date: '', update_date: '' },
  { title: 'Book 2', author: 'Author 2', published_date: '2022-02-01', created_date: '', update_date: '' },
];

const mockEditRecord = jest.fn();
const mockNavigate = jest.fn()


jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      return mockNavigate;
    },
  };
});

describe('Interface Tests', () => {
  test('renders with records', () => {
    const { getByText } = render(<Table records={records} editRecord={mockEditRecord} />);
    expect(getByText(/Book 1/i)).toBeInTheDocument();
    expect(getByText(/Author 1/i)).toBeInTheDocument();
    expect(getByText(/2022-01-01/i)).toBeInTheDocument();
    expect(getByText(/Book 2/i)).toBeInTheDocument();
    expect(getByText(/Author 2/i)).toBeInTheDocument();
    expect(getByText(/2022-02-01/i)).toBeInTheDocument();
  });
});

describe('Modularity Tests', () => {
  test('Naivgates on edit click', async () => {
    const { getByTestId } = render(<Table records={records} editRecord={mockEditRecord} />);

    const submitButton = getByTestId('Edit')
    await act(async () => {
      await userEvent.click(submitButton);
    });
    await waitFor(() => {
      return expect(mockNavigate).toHaveBeenCalledWith('/edit')
    })
  });
});

