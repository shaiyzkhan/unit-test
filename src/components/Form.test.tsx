import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import userEvent from '@testing-library/user-event';
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

    await waitFor(() => expect(titleInput).toHaveValue(''))
    await waitFor(() => expect(authorInput).toHaveValue(''))
    await waitFor(() => expect(pdInput).toHaveValue(''))

    await userEvent.clear(titleInput)
    await userEvent.clear(authorInput)
    await userEvent.clear(pdInput)


    await act(async() => {
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
  test('Submits form with correct values', async () => {

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
});