import React, { useEffect, useState } from 'react';

import Papa from 'papaparse';
import { Box, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Input from './components/Input';
import ProductsList from './components/ProductsList';
import './styles/App.scss';

export interface Product {
  title: string;
  gtin: number;
  gender: string;
  sale_price: string;
  price: string;
  image_link: string;
  additional_image_link: string;
}

const useStyles = makeStyles(() => ({
  paginator: {
    justifyContent: 'center',
    padding: 10,
    marginTop: 35,
  },
}));

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [productHints, setProductHints] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const [noOfPages, setNoOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const classes = useStyles();

  // On application's initial render
  useEffect(() => {
    Papa.parse('data/test.csv', {
      header: true,
      download: true,
      complete: function (results) {
        const products = results.data as unknown as Product[];

        // 1. Parse csv file and store its values in 'data' state
        setData(products);

        // 2. Initialize 'productHints' state with the title of all products
        setProductHints(products.map((product) => product.title));
      },
    });
  }, []);

  // Retrieve user's keystrokes and store it in 'inputValue' state
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  // On every change of 'inputValue || page' state values
  useEffect(() => {
    // 1. If user's input value is NOT an empty string
    if (inputValue.trim()) {
      // 1.1. Store all products whose title include the user's inputValue
      const matchedProducts = data.filter((item) =>
        item.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      );

      // 1.2. Select the list of products to be rendered
      const productsToRender = matchedProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
      );

      setProducts(productsToRender);

      // 1.3. Calculate number of pages that will contain all matchedProducts || '1' if no matches were found
      const numberOfPages =
        Math.ceil(matchedProducts.length / productsPerPage) || 1;

      setNoOfPages(numberOfPages);
    }

    // 2. If user clears out inputValue using 'Backspace'
    if (!inputValue.trim()) setNoOfPages(1);
  }, [data, inputValue, page]);

  // When user clicks on clear input icon
  const clearInput = () => {
    setInputValue('');
  };

  // Pagination change handler
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <main>
        <Input
          inputValue={inputValue}
          handleOnChange={handleOnChange}
          productHints={productHints}
          clearInput={clearInput}
        />

        <ProductsList products={products} />
      </main>
      <Box>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </div>
  );
}

export default App;
