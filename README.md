# Ứng dụng Nghe nhạc trên Android
## Mục lục
- [Cài đặt](#cài-đặt)
- [Cấu trúc project](#cấu-trúc-project)
- [Các thư viện sử dụng](#các-thư-viện-sử-dụng)
## Cài đặt
- Kéo source về
```
git clone https://github.com/uit2712/RNAudioApp
```
- Sau đó vào trong thư mục của project vừa kéo về, chạy câu lệnh sau
```
npm i
```
## Cấu trúc project
    .
    ├── components                                  # Chứa các component con theo từng màn hình, tab
    │   ├── shared                                  # Chứa các component dùng cho nhiều nơi   
    |   ├── ...                                     
    ├── constants                                   # Chứa các hằng số dùng chung hoặc cho từng màn hình
    |   ├── index.ts                                # Hằng số dùng chung cho nhiều nơi
    |   ├── sound-player-screen.ts                  # Hằng số dùng cho màn hình SoundPlayerScreen
    ├── context-api                                 # Chứa các context api dùng chung hoặc cho từng màn hình
    |   ├── index.ts                                # Context-api dùng chung cho nhiều nơi
    |   ├── playlists-screen-context-api.ts         # Context-api dùng cho màn hình PlaylistsScreen
    ├── functions                                   # Chứa các hàm dùng chung hoặc cho từng màn hình
    |   ├── index.ts                                # Hàm dùng chung cho nhiều nơi
    |   ├── albums-screen-functions.ts              # Hàm dùng cho màn hình AlbumsScreen
    |   ├── ...                                     
    ├── helpers                                     # Chứa các helper dùng chung
    |   ├── audio-helper.ts                         # Helper dùng cho tính năng chơi nhạc của ứng dụng
    |   ├── modal-helper.ts                         # Helper dùng cho tính năng hiển thị/ẩn modal
    |   ├── index.ts                                # Helper dùng cho nhiều nơi
    ├── hocs                                        # Chứa các Higher-Order Component/Function dùng chung hoặc cho từng màn hình
    │   ├── shared                                  # Chứa các Higher-Order Component/Function dùng cho nhiều nơi
    |   ├── ...
    ├── hooks                                       # Chứa các custom hook dùng chung hoặc cho từng màn hình
    |   ├── index.ts                                # Custom hook dùng chung cho nhiều nơi
    |   ├── albums-screen-hooks.ts                  # Custom hook dùng cho màn hình AlbumsScreen
    |   ├── ...                                     
    ├── images                                      # Chứa các hình ảnh dùng cho ứng dụng
    ├── interfaces                                  # Chứa các interface dùng chung hoặc cho từng màn hình/tab
    |   ├── index.ts                                # Interface dùng chung cho nhiều nơi
    |   ├── albums-screen-interfaces.ts             # Interface dùng cho màn hình AlbumsScreen
    |   ├── ...                                                            
    ├── navigators                                  # Chứa các component, config cho navigator, hiện tại sử dụng react-navigation v5
    |   ├── components                              # Chứa các component được cấu trúc theo mối quan hệ cha-con. Trong trường hợp này ta có 1 drawer chứa 3 thành phần: home (home chứa các tab như albums, artists), settings, splash screen
    |   |   ├── drawer-home
    |   |   |   ├── tab-albums
    |   |   |   ├── tab-artists
    |   |   |   ├── ...
    |   |   ├── drawer-settings
    |   |   ├── drawer-splash-screen
    |   ├── config                                  # Chứa các cấu hình cho các component tương ứng ở trên dùng cho hook: navigation (cấu hình cho phương thức navigate), route (cấu hình route params) 
    ├── screens                                     # Chứa các màn hình trong toàn dự án
    |   ├── AddSongToPlaylistScreen.tsx             
    |   ├── AlbumsScreen.tsx             
    |   ├── ...
    ├── store
    |   ├── actions                                 # Chứa các action theo từng màn hình/tab
    |   ├── interfaces                              # Chứa các interface liên quan đến state theo từng màn hình/tab
    |   ├── reducers                                # Chứa các reducer theo từng màn hình/tab
    |   |   ├── index.ts                            # Chứa reducer gom chung các reducer khác lại để định nghĩa store
    |   |   ├── ...                                 
    |   ├── selectors                               # Chứa các selector theo từng màn hình/tab
    ├── types                                       # Chứa các kiểu dữ liệu theo từng màn hình/tab
    |   ├── index.ts                                # Chứa các kiểu dữ liệu dùng chung
    |   ├── albums-screen-types.ts                  # Kiểu dữ liệu dùng cho màn hình AlbumsScreen
    |   ├── ...
## Các thư viện sử dụng
### react-native-sound
- Link: https://www.npmjs.com/package/react-native-sound
### react-navigation 5
- Link: https://www.npmjs.com/package/react-navigation
### react-native-get-music-files
- Link gốc: https://www.npmjs.com/package/react-native-get-music-files
- Link đã qua chỉnh sửa: https://github.com/uit2712/react-native-get-music-files
- Chú thích: đã được chỉnh sửa lại theo nhu cầu sử dụng của bản thân người viết tài liệu
### react-native-fast-image
- Link: https://www.npmjs.com/package/react-native-fast-image
### redux
- redux: https://www.npmjs.com/package/redux
- redux-persist: https://www.npmjs.com/package/redux-persist
- redux-thunk: https://www.npmjs.com/package/redux-thunk
- react-redux: https://www.npmjs.com/package/react-redux
### react-native-elements
- Link: https://www.npmjs.com/package/react-native-elements
### react-native-linear-gradient
- Link: https://www.npmjs.com/package/react-native-linear-gradient
### react-native-vector-icons
- Link: https://www.npmjs.com/package/react-native-vector-icons
### immutability-helper
- Link: https://www.npmjs.com/package/immutability-helper
