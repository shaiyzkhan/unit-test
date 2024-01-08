import EditFormPage from './EditFormPage';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockUpdateRecord = jest.fn();

const record = {
    title: 'Book 1',
    author: 'Author 1',
    published_date: '2022-01-01',
    created_date: '',
    update_date: '',
};

describe('EditFormPage', () => {
    test('It renders correctly', () => {
        const screen = render(
            <BrowserRouter>
                <ToastProvider>
                    <EditFormPage record={record} updateRecord={mockUpdateRecord} success={false} />
                </ToastProvider>
            </BrowserRouter>
        );
        expect(screen.baseElement).toBeTruthy();
    });
});

