import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
import { data } from '../public/data/testData';

const server = setupServer(
  rest.get('http://localhost/data/test.csv', (req, res, ctx) => {
    return res(ctx.text(data));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('app', () => {
  it('renders app without any products', () => {
    render(<App />);

    // Assert the non-existance of the container that holds products list
    expect(screen.queryByTestId('products-list')).toBeNull();
  });

  it('changes displayed products on input keystrokes', async () => {
    render(<App />);

    // 1. Type a generic input value
    const input = screen.getByTitle('Search');
    fireEvent.change(input, { target: { value: 's' } });

    // 1.1. Assert existance of 2 products that match that value
    const salomonXUltraGtin = 889645420394;
    const sisleyLangarmshirtGtin = 8031894587706;

    expect(await screen.findByTestId(salomonXUltraGtin)).toBeInTheDocument();
    expect(
      await screen.findByTestId(sisleyLangarmshirtGtin)
    ).toBeInTheDocument();

    // 2. Narrowing down the search term
    fireEvent.change(input, { target: { value: 'sa' } });

    // 2.1. Assert existance of only 1 product that match that value
    expect(await screen.findByTestId(salomonXUltraGtin)).toBeInTheDocument();

    // 2.2. Assert the non-existance of the 2nd product
    expect(screen.queryByTestId(sisleyLangarmshirtGtin)).toBeNull();
  });
});

describe('product card', () => {
  it('shows product price with strike styling when "sale price" is less than "price"', async () => {
    render(<App />);

    // 1. Search for a product with sale price less than price
    const input = screen.getByTitle('Search');
    fireEvent.change(input, { target: { value: 'vila' } });

    // 2. Assert existance of that product
    const vilaTShirtGtin = 5713780132261;
    expect(await screen.findByTestId(vilaTShirtGtin)).toBeInTheDocument();

    // 3. Assert that price has strike styling
    const priceClassName = screen.getByTestId('price-5713780132261').className;
    expect(priceClassName.includes('strike')).toBe(true);

    // 4. Assert existance of sale price
    expect(screen.getByTestId('sale-price-5713780132261')).toBeInTheDocument();
  });

  it('shows modal with additional images when clicking on "show more" btn', async () => {
    render(<App />);

    // 1. Search for a product
    const input = screen.getByTitle('Search');
    fireEvent.change(input, { target: { value: 'vila' } });

    // 2. Assert existance of the product/s that match that value
    const vilaTShirtGtin = 5713780132261;
    expect(await screen.findByTestId(vilaTShirtGtin)).toBeInTheDocument();

    // 3. Find the 'show more' btns, and click the first btn in the array
    const showMoreBtns = screen.getAllByRole('button', { name: /show more/i });
    fireEvent.click(showMoreBtns[0]);

    // 4. Assert the appearance of the additional image/s
    const additionalImagesArr = screen.getAllByTestId('additional-image');
    expect(additionalImagesArr.length).not.toBeNull();
  });
});

describe('pagination', () => {
  it('shows more than 1 page number, when products matching input value exceeds productsPerPage limit', () => {
    render(<App />);

    // 1. Type a generic input value
    const input = screen.getByTitle('Search');
    fireEvent.change(input, { target: { value: 's' } });

    // 2. Assert existance of more than 1 page number item
    const totalPages = screen.getAllByRole('listitem');
    expect(totalPages.length).toBeGreaterThan(1);
  });

  it('displays different products containing input value when clicking on "Go to next page" btn', async () => {
    render(<App />);

    // 1. Type a generic input value
    const input = screen.getByTitle('Search');
    fireEvent.change(input, { target: { value: 's' } });

    // 2. Click on 'go to next page'btn
    const goToNextPageBtn = screen.getByRole('button', {
      name: 'Go to next page',
    });
    fireEvent.click(goToNextPageBtn);

    // 3. Assert the existance of a product from the 2nd page
    const PetrolIndustriesShortsMaroonGtin = 5713780132261;
    expect(
      await screen.findByTestId(PetrolIndustriesShortsMaroonGtin)
    ).toBeInTheDocument();
  });
});
