//"@babel/core": "^7.17.8", //최신문법으로 바꿔줌
//"@babel/preset-env": "^7.16.11", //환경에 맞게 알아서 바꿔줌 (최신문법을 옛날 문법으로 바꿔줌)
//"@babel/preset-react": "^7.16.7", //바벨이랑 리엑트랑 연결해 주는거
//"babel-loader": "^8.2.4", //바벨이랑 웹핵이랑 연결해 주는거

const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development", // -개발용  production-실서비스
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  }, //입력

  module: {
    rules: [
      {
        test: /\.jsx?/, //js & jsx파일에 룰을 적용시키겠다,
        loader: "babel-loader", //babel 룰을 적용시키겠따??????
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: [">5% in KR", "last 2 chrome versions"], //browserslist
                  //>5% in KR 한국에서 점유율이 5%이상인 브라우저 지원/크롬의 최신버전 2개만 지원
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        }, // babel의 option
      },
    ],
  }, //module을 적용하여
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    //__dirname 현재폴더 안에 dist
    filename: "app.js",
    publicPath: "/dist/",
  }, //출력
  devServer: {
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
