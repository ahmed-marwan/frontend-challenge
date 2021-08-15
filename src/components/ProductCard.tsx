import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardActions, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Product } from '../App';
import Modal from './Modal';

interface ProductCardProps {
  product: Product;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 350,
      padding: 10,
    },
    media: {
      minHeight: 270,
    },
    strike: {
      color: 'red',
      paddingRight: 10,
      textDecoration: 'line-through',
    },
  })
);

function ProductCard({ product }: ProductCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <CardMedia
        className={classes.media}
        image={product.image_link}
        title="Product"
      />

      <CardContent>
        <Typography noWrap gutterBottom variant="h6" data-testid={product.gtin}>
          {product.title}
        </Typography>

        <Typography
          variant="subtitle1"
          color="primary"
          component="span"
          className={product.price > product.sale_price ? classes.strike : ''}
          data-testid={`price-${product.gtin}`}
        >
          {product.price}
        </Typography>

        {product.price > product.sale_price && (
          <Typography
            variant="subtitle1"
            color="primary"
            component="span"
            data-testid={`sale-price-${product.gtin}`}
          >
            {product.sale_price}
          </Typography>
        )}

        <Typography variant="subtitle1" component="h3">
          {product.gender}
        </Typography>
      </CardContent>

      <CardActions>
        <Modal product={product} />
      </CardActions>
    </Card>
  );
}

export default ProductCard;
