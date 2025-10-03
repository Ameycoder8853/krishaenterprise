import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// The JSON file is not a module, so we have to access the data directly.
export const PlaceHolderImages: ImagePlaceholder[] = (data as any).placeholderImages;
