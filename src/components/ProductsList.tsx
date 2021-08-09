import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import ProductCard from './ProductCard';
import { Product } from '../App';

interface ProductsListProps {
  products: Product[];
}

function ProductsList({ products }: ProductsListProps) {
  if (!products.length) return <div></div>;

  return (
    <Container data-testid="products-list">
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.gtin} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductsList;
