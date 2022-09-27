import { render, screen } from '@testing-library/react';
import PokemonList from '../components/PokemonList';
describe('PokemonList', ()=>{
  test('has pagination component', () => {
    render(<PokemonList />);
    const linkElement = screen.getByTestId("pagination");
    expect(linkElement).toBeInTheDocument();
  });
})
