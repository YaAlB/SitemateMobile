import { Photos, Photo } from '.';

export default {
  getUniquePhotos: (photos: Photos, photoIds: Set<unknown>) => {
    const newPhotos = photos.photo.filter((photo) => {
      return !photoIds.has(photo.id); // Filter out photos with existing IDs
    });

    // Update the photoIds set with new photo IDs
    const newPhotoIds = new Set([...photoIds, ...newPhotos.map((photo: Photo) => photo.id)]);
    return { newPhotoIds, newPhotos };
  },
};