import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

const records = [
  { title: 'Book 1', author: 'Author 1', published_date: '2022-01-01', created_date: '', update_date: '' },
  { title: 'Book 2', author: 'Author 2', published_date: '2022-02-01', created_date: '', update_date: '' },
];

const mockEditRecord = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

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


