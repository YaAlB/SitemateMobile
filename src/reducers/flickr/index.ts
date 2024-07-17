import actionTypes from './actionTypes';

export interface Photo {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  photo: Photo[];
}

export interface State {
  photos: Photos;
  loadingPhotos?: boolean;
  errorPhotos?: string;
  successPhotos?: boolean;
}

const initialState: State = {
  photos: {
    page: 1,
    pages: 1,
    perpage: 50,
    photo: [],
  },
};

const reducer = (state: State = initialState, action: Redux.RootActions): State => {
  switch (action.type) {
    case actionTypes.FLICKR_IMAGES_LOADING:
      return { ...state, loadingPhotos: true };
    case actionTypes.FLICKR_IMAGES_SUCCESS:
      return { ...state, loadingPhotos: false, photos: action.payload.photos };
    case actionTypes.FLICKR_IMAGES_FAIL:
      return { ...state, loadingPhotos: false, errorPhotos: action.payload.photos };

    default:
      return state;
  }
};

export default reducer;