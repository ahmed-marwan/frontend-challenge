import React from 'react';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 350,
    },
    media: {
      minHeight: 270,
      paddingTop: '10.25%', // 16:9
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
        <Typography noWrap gutterBottom variant="h6">
          {product.title}
        </Typography>

        <Typography
          variant="subtitle1"
          color="primary"
          component="span"
          className={product.price > product.sale_price ? classes.strike : ''}
        >
          {product.price}
        </Typography>

        {product.price > product.sale_price && (
          <Typography variant="subtitle1" color="primary" component="span">
            {product.sale_price}
          </Typography>
        )}

        <Typography variant="subtitle1" component="h3">
          {product.gender}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
