import React from 'react';
import { Button, CardMedia, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Product } from '../App';

interface ModalProps {
  product: Product;
}

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      maxWidth: 490,
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    media: {
      minHeight: 270,
    },
  })
);

function TransitionsModal({ product }: ModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderAdditionalImage = () => {
    return (
      <Grid container spacing={1}>
        {product.additional_image_link.split(',').map((img, index) => (
          <Grid key={index} item xs={12} sm={6} md={6}>
            <CardMedia className={classes.media} image={img} title="Product" />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Show More
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{renderAdditionalImage()}</Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;
