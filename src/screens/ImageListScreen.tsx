import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import flickrActions from '../reducers/flickr/actions';
import { Photo } from '../reducers/flickr/index';
import flickrSelectors from '../reducers/flickr/selectors';

const ImageListScreen = ({ route }: any) => {
  const { searchTerm } = route.params;

  const {
    flickr: {
      photos: { pages },
      photos,
    },
  } = useSelector((state: Redux.RootState) => state);

  const [images, setImages] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [photoIds, setPhotoIds] = useState(new Set());

  const dispatch = useDispatch<Redux.Dispatch>();
  const flickrActionDispatcher = bindActionCreators(flickrActions, dispatch);

  useEffect(() => {
    setImages(photos.photo);
    setPhotoIds(new Set());
    return () => {
      setImages([]);
      setPhotoIds(new Set());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchImages = async () => {
    if (loading && currentPage > pages) return; // Avoid multiple simultaneous requests & currentPage is not exceeding total pages
    setLoading(true);

    await flickrActionDispatcher.getImages(searchTerm, currentPage);
    if (photos && photos.photo) {
      const { newPhotoIds, newPhotos } = flickrSelectors.getUniquePhotos(photos, photoIds);

      setPhotoIds(newPhotoIds);
      setImages((prevImages) => [...prevImages, ...newPhotos]);
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    fetchImages();
  };

  return (
    <View>
      <FlatList
        data={images}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={(_, index: number) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: `https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
            }}
            style={{ width: 150, height: 150, margin: 10, borderRadius: 10 }}
          />
        )}
        onEndReached={handleEndReached} // Load more images when the user reaches the end
        onEndReachedThreshold={0.5} // Load more when the user is close to the end
        ListFooterComponent={loading ? <ActivityIndicator /> : undefined} // Show a loading indicator at the end
      />
    </View>
  );
};

export default ImageListScreen;