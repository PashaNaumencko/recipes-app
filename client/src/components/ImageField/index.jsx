import React from 'react';
import ImageUploader from 'react-images-upload';

const ImageField = ({ field, onImageChange }) => {
  return (
    <ImageUploader
      {...field}
      onChange={onImageChange}
      withIcon
      buttonText="Choose dish image"
      buttonType="button"
      withPreview
      imgExtension={['.jpg', '.png']}
      singleImage
    />
  );
};

export default ImageField;
