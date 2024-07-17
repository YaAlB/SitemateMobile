import actionTypes from './actionTypes';
import { Photos } from '.';
import axios from 'axios';
import RNConfig from 'react-native-config';

export type Actions =
  | Redux.Action<actionTypes.FLICKR_IMAGES_SUCCESS, { payload: Photos }>
  | Redux.Action<actionTypes.FLICKR_IMAGES_FAIL, { payload: string }>
  | Redux.Action<actionTypes.FLICKR_IMAGES_LOADING>;

export default {
  getImages:
    (searchTerm: string, currentPage: number): Redux.ThunkAction<Promise<Photos | undefined>> =>
    (dispatch: any) => {
      dispatch({ type: actionTypes.FLICKR_IMAGES_LOADING });

      return axios
        .get<Photos>(
          `${RNConfig.FLICKR_URL}/services/rest/?method=flickr.photos.search&api_key=${RNConfig.FLICKR_TOKEN}&format=json&nojsoncallback=1&text=${searchTerm}&format=json&nojsoncallback=1&&page=${currentPage}&per_page=50`,
        )
        .then((response) =>
          dispatch({
            type: actionTypes.FLICKR_IMAGES_SUCCESS,
            payload: response.data,
          }),
        )
        .catch((err) => {
          dispatch({ type: actionTypes.FLICKR_IMAGES_FAIL, payload: err });
        });
    },
};