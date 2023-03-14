import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from 'components/Modal';
import { Img, Wrapper } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item: { webformatURL, tags, largeImageURL } }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Wrapper onClick={setShowModal}>
        <Img src={webformatURL} alt={tags} />
      </Wrapper>
      {showModal && (
        <Modal onClose={setShowModal}>
          <img src={largeImageURL} alt="tag" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
