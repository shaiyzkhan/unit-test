import '@testing-library/jest-dom';
import EditForm from './EditForm';
import { render, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const record = {
  title: 'Book 1',
  author: 'Author 1',
  published_date: '2022-01-01',
  created_date: '',
  update_date: '',
};

const mockUpdateRecord = jest.fn();
const mockAddToast = jest.fn()
const mockNavigate = jest.fn()



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
  test('Renders EditForm component with record data', () => {
    const { getByTestId } = render(<EditForm record={record} updateRecord={mockUpdateRecord} success={false} />);
    expect(getByTestId(/title/i)).toHaveValue('Book 1');
    expect(getByTestId(/author/i)).toHaveValue('Author 1');
    expect(getByTestId(/published_date/i)).toHaveValue('2022-01-01');
  });
});

describe('EditForm Interaction Tests', () => {
  test('Submits form with correct values ', async () => {
    const testRecord = {
      title: '4 Hour workweek',
      author: 'Author 1',
      published_date: '2022-01-01',
    };
    const mockUpdateRecord = jest.fn();
    const { getByTestId } = render(
      <EditForm record={record} updateRecord={mockUpdateRecord} success={false} />
    );

    const titleInput = getByTestId('title');
    const authorInput = getByTestId('author');
    const pdInput = getByTestId('published_date');
    const submitButton = getByTestId('Update Record');

    await waitFor(() => expect(titleInput).toHaveValue(record.title))
    await waitFor(() => expect(authorInput).toHaveValue(record.author))
    await waitFor(() => expect(pdInput).toHaveValue(record.published_date))

    await userEvent.clear(titleInput)
    await userEvent.clear(authorInput)
    await userEvent.clear(pdInput)

    await act(async () => {
      await userEvent.type(titleInput, testRecord?.title);
      await userEvent.type(authorInput, testRecord?.author);
      await userEvent.type(pdInput, testRecord?.published_date);
    });

    expect(titleInput).toHaveValue(testRecord?.title);
    expect(getByTestId('author')).toHaveValue(testRecord?.author);
    expect(getByTestId('published_date')).toHaveValue(testRecord?.published_date);

    await act(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockUpdateRecord).toHaveBeenCalledWith({
        ...testRecord
      });
    });

  });
});

describe('Modularity Tests', () => {
  test('Submits form with correct values and displays success toast', async () => {
  
    const mockUpdateRecord = jest.fn();
    const { getByTestId } = render(
      <EditForm record={record} updateRecord={mockUpdateRecord} success={false} />
    );
    const submitButton = getByTestId('Update Record')
    await act(async () => {
     await userEvent.click(submitButton);
    });
    expect(mockUpdateRecord).toHaveBeenCalled()
    await waitFor(() => {
      return expect(mockAddToast).toHaveBeenCalledWith('Record updated successfully', { appearance: 'success' })
    })

  });
});