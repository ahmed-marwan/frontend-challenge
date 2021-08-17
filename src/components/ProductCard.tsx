import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardActions, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Product } from '../App';
import Modal from './Modal';
import useOnScreen from '../hooks/useOnScreen';

interface ProductCardProps {
  product: Product;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 350,
      minHeight: 426,
      padding: 10,
    },
    media: {
      minHeight: 270,
    },
    cardContent: {
      paddingBottom: 0,
    },
    strike: {
      color: 'red',
      paddingRight: 10,
      textDecoration: 'line-through',
    },
    capitalize: {
      textTransform: 'capitalize',
    },
    showMore: {
      justifyContent: 'flex-end',
      padding: '0 8px',
    },
  })
);

function ProductCard({ product }: ProductCardProps) {
  const classes = useStyles();
  const allowedGenderValues = ['female', 'male', 'unisex'];

  // Percentage of img container's visibility before running the intersection fn
  const [ref, visible] = useOnScreen({ threshold: 0.15 });

  return (
    <Card
      className={classes.root}
      elevation={2}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {/* Showing imgs only when container is visible */}
      {visible && (
        <CardMedia
          className={classes.media}
          image={product.image_link}
          title="Product"
        />
      )}

      <CardContent className={classes.cardContent}>
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

        <Typography
          variant="subtitle1"
          component="h3"
          className={classes.capitalize}
        >
          {/* Filter out non gender union type values */}
          {allowedGenderValues.indexOf(product.gender) === -1
            ? ''
            : product.gender}
        </Typography>

        <Typography variant="overline" component="span">
          {product.gtin}
        </Typography>
      </CardContent>

      <CardActions className={classes.showMore}>
        <Modal product={product} />
      </CardActions>
    </Card>
  );
}

export default ProductCard;
