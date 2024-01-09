import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import userEvent from '@testing-library/user-event';
import { BookRecord } from '../types';
import Table from './Table';
const mockAddRecord = jest.fn();
const mockAddToast = jest.fn()
const mockNavigate = jest.fn()

const renderForm = () => {
  return render(
    <Form addRecord={mockAddRecord} success={false} />
  );
};
jest.mock('react-toast-notifications', () => {
  return {
    useToasts: () => {
      return { addToast: mockAddToast };
    },
    ToastProvider: (props: any) => <>{props.children}</>

  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      return mockNavigate;
    },
  };
});


describe('Interface Tests', () => {
  it('renders Form component', () => {
    const { getByTestId, getByText } = renderForm();
    expect(getByTestId(/title/i)).toBeInTheDocument();
    expect(getByTestId(/author/i)).toBeInTheDocument();
    expect(getByTestId(/published_date/i)).toBeInTheDocument();
    expect(getByTestId(/Add Record/i)).toBeInTheDocument();
  });
});

describe('Interaction Tests', () => {
  test('Submits form with correct values', async () => {
    const testData = {
      title: 'Book 3',
      author: 'Author 3',
      published_date: '2022-03-01'
    };
    const mockAddRecord = jest.fn();
    const { getByTestId } =
      render(<Form addRecord={mockAddRecord} success={false} />);

    const titleInput = getByTestId('title');
    const authorInput = getByTestId('author');
    const pdInput = getByTestId('published_date')
    const submitButton = getByTestId('Add Record')

    await act(async () => {
      await userEvent.type(titleInput, testData.title);
      await userEvent.type(authorInput, testData.author);
      await userEvent.type(pdInput, testData.published_date);
    });

    expect(getByTestId('title')).toHaveValue(testData.title);
    expect(getByTestId('author')).toHaveValue(testData.author);
    expect(getByTestId('published_date')).toHaveValue(testData.published_date);

    await act(async () => {
      userEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(mockAddRecord).toHaveBeenCalledWith({
        ...testData
      });
    });

  });
});

describe('Modularity Tests', () => {
  test('Display toast after form has been submitted', async () => {
    const mockAddRecord = jest.fn();
    const { getByTestId } =
      render(
        <Form addRecord={mockAddRecord} success={false} />
      );

    const submitButton = getByTestId('Add Record')

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockAddRecord).toHaveBeenCalled()

    await waitFor(() => {
      return expect(mockAddToast).toHaveBeenCalledWith('Record added successfully', { appearance: 'success' })
    })

  });

  test('Updated data in table after adding a record', async () => {
    let records: BookRecord[] = [{
      title: 'Book 3',
      author: 'Author 3',
      published_date: '2022-03-01'
    }];

    const record: BookRecord = {
      title: 'Book 4',
      author: 'Author 4',
      published_date: '2023-03-01'
    }

    const mockAddRecord = jest.fn((newRecord: BookRecord) => {
      records = [...records, newRecord];
    });

    const { rerender, getByTestId } = render(
      <>
        <Form addRecord={mockAddRecord} success={false} />
        <Table records={records} editRecord={() => { }} />
      </>
    );

    await waitFor(() => expect(getByTestId('title-0')).toHaveTextContent(records[0].title))
    await waitFor(() => expect(getByTestId('author-0')).toHaveTextContent(records[0].author))
    await waitFor(() => expect(getByTestId('published_date-0')).toHaveTextContent(records[0].published_date))

    // act user filling out the form
    await act(async () => {
      await userEvent.type(getByTestId('title'), record.title);
      await userEvent.type(getByTestId('author'), record.author);
      await userEvent.type(getByTestId('published_date'), record.published_date);
    })

    const submitButton = getByTestId('Add Record');

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockAddRecord).toHaveBeenCalled();

    rerender(
      <>
        <Form addRecord={mockAddRecord} success={false} />
        <Table records={records} editRecord={() => { }} />
      </>
    );

    await waitFor(() => {

      expect(getByTestId('title-1')).toHaveTextContent(record.title)
      expect(getByTestId('author-1')).toHaveTextContent(record.author)
      expect(getByTestId('published_date-1')).toHaveTextContent(record.published_date)
    });

  });
});