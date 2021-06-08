module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            "module-resolver",
            {
                "extensions": [
                    ".ios.ts",
                    ".android.ts",
                    ".ts",
                    ".ios.tsx",
                    ".android.tsx",
                    ".tsx",
                    ".jsx",
                    ".js",
                    ".json"
                ],
                "alias": {
                    "@common/*": ["RNMusicApp/common/*"]
                }
            }
        ],
        'react-native-reanimated/plugin',
    ],
};
