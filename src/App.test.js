import { render, screen } from '@testing-library/react';
import App from './App';
jest.mock('./pages/Gallery', () => () => <div>Gallery</div>);
jest.mock('react-slick', () => () => null);
jest.mock('./pages/WeddingPremiere', () => () => <div>Wedding premiere</div>);
test('event URLs render the dedicated premiere layout', () => {
 window.history.replaceState({}, '', '/anna-marco');
 render(<App />);
 expect(screen.getByText('Wedding premiere')).toBeInTheDocument();
 expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
 window.history.replaceState({}, '', '/');
});
