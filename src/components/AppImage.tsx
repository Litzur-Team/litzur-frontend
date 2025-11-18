'use client'

import React from 'react';
import { ImageProps } from '../types/components';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}: ImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;
