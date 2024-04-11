import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

test("Should display 'Loading...' text", () => {
    render(<Loading />);
    const textElement = screen.getByText('Loading...');
    expect(textElement).toBeInTheDocument();
})