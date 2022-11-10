/* eslint-disable import/no-useless-path-segments */
import { render, screen } from '@testing-library/react';
import MoviesPage from '../../src/modules/movies/components/MoviesPage/MoviesPage';
import CreateMoviePage from '../../src/modules/movies/components/CreateMoviePage/CreateMoviePage';

test('renders learn react link', () => {
  render(<MoviesPage />);
  const newElement = screen.getByText(/shrek/i);
  expect(newElement).not.toBeInTheDocument();

  const form = render(<CreateMoviePage />);
  console.log(form);
});
