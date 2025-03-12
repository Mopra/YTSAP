# YTSAP - YouTube Shorts Auto-Next

## Overview

YTSAP (YouTube Shorts Auto-Next) is a browser extension designed to enhance your YouTube Shorts viewing experience by automatically navigating to the next video when the current one ends. This extension ensures a seamless and uninterrupted viewing experience.

## Features

- **Automatic Navigation**: Automatically clicks the "Next video" button when a YouTube Short ends.
- **Loop Attribute Removal**: Ensures that the video does not loop by removing the 'loop' attribute from the video player.
- **Dynamic Video Detection**: Detects changes in the video source and reinitializes the video listener for new videos.

## Installation

1. Clone or download this repository.
2. Open your browser's extensions page (usually found in the settings menu).
3. Enable "Developer mode" (usually a toggle in the top right corner).
4. Click "Load unpacked" and select the directory where you downloaded/cloned this repository.

## Usage

Once installed, the extension will automatically start working when you watch YouTube Shorts. It will detect when a video ends and navigate to the next one without any user intervention.

## Technical Details

- **Manifest Version**: 3
- **Permissions**: Requires access to the active tab to function correctly.
- **Content Script**: Injects a script into YouTube Shorts pages to manage video playback and navigation.

## Code Overview

- **manifest.json**: Defines the extension's metadata and permissions.
  ```json:manifest.json
  startLine: 2
  endLine: 19
  ```

- **content.js**: Contains the logic for navigating to the next video and managing video playback.
  ```javascript:content.js
  startLine: 1
  endLine: 74
  ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
