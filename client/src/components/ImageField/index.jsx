import React from 'react';
import ImageUploader from 'react-images-upload';

const ImageField = ({ field, onImageChange, defaultImage }) => {
  return (
    <ImageUploader
      {...field}
      onChange={onImageChange}
      withIcon
      defaultImages={[defaultImage]}
      buttonText="Choose dish image"
      buttonType="button"
      withPreview={Boolean(defaultImage)}
      imgExtension={['.jpg', '.png']}
      singleImage
    />
  );
};

export default ImageField;
