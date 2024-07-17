# Intro

Welcome to the React Native Image Search App! This app allows users to search for images using the Flickr image search API, view search history, and display the search results in a scrollable grid.

## The following has been achieved

- Search for images with specific search terms.
- Lazy loading of images for a smooth scrolling experience.
- View and interact with search history.
- Delete individual search history items with long press.

## Development Environment Setup

Using the React Native CLI [Development Environment](https://reactnative.dev/docs/environment-setup), setup your machine for Android (and iOS for macs).

The npm package manager is also what we use instead of yarn so make sure that is installed as well.

## Running the project

### Install Node Dependencies

In the root folder of the project run

```bash
npm
```

### (iOS Only) Install CocoaPod Dependencies

If you are trying to run an iOS build you will also need to pull any pods as well using. Please make sure you are inside the `ios` folder in order to install the node_module and CocoaPod pods.

```bash
cd ios
pod install
```

### Building and running the app

```bash
# Start the React Native packager
npm start
```

### Run the app on an iOS/Android Emulator or a physical device:

```bash

# For iOS
npm react-native run-ios
cd ios && pod install

# For Android
npm react-native run-android
```

Make sure you have the Android/iOS Emulator running or your physical device connected.

## Contributing

Contributions to the Movie Search App are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/YaAlB/FlickrProject).

## License

The Movie Search App is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the app as per the terms of the license.
