import Express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Provider } from "react-redux";
import React from "react";
import { renderToString } from "react-dom/server";
import { RouterContext, match as Match } from "react-router";
// Webpack Requirements
import webpack from "webpack";
import webpackConfig from "../webpack.config.dev";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
// React And Redux Setup
import { configureStore } from "../shared/redux/store/configureStore";

// Import required modules
import routes from "../shared/routes";
import { fetchComponentData } from "./util/fetchData";
import urls from "./routes/url.routes";
import { getRedirectUrl } from "./controllers/url.controller";
import { connectDB } from "./util/db";

// Initialize the Express App
const PORT = process.env.PORT || 8000;
const app = new Express();

const useDB = () => async (req, res, next) => {
  const { client, db } = await connectDB();
  const isConnected = await client.isConnected();

  if (!isConnected) {
    return res.status(500).send("Database is not working :( so sorry! ");
  }
  req._db = db; // attach db to req object for appwide access
  next();
};

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath =
    process.env.NODE_ENV === "production" ? "/css/app.min.css" : "/css/app.css";
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>mern-bite-url</title>
        <link rel="stylesheet" href=${cssPath} />
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = "&#32;&#32;&#32;&#32;";
  const errTrace =
    process.env.NODE_ENV !== "production"
      ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(
          /\n/g,
          `<br>${softTab}`
        )}</pre>`
      : "";
  return renderFullPage(`Server Error${errTrace}`, {});
};

if (process.env.NODE_ENV !== "production") {
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// Apply body Parser and server public assets and routes
app.use(useDB());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(Express.static(path.resolve(__dirname, "../static")));
app.use("/api", urls);

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  return Match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(renderError(err));
      }

      if (redirectLocation) {
        return res.redirect(
          302,
          redirectLocation.pathname + redirectLocation.search
        );
      }

      if (!renderProps) {
        return next();
      }

      const initialState = {
        posts: [],
        post: {},
      };

      const store = configureStore(initialState);

      if (renderProps.params.hash) {
        //user is pasting url
        return getRedirectUrl(req, renderProps.params.hash, res);
      }

      return fetchComponentData(
        store,
        renderProps.components,
        renderProps.params
      ).then(() => {
        const initialView = renderToString(
          React.createElement(
            Provider,
            {
              store: store,
            },
            React.createElement(RouterContext, renderProps)
          )
          /* babel issue on vercel 
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
          */
        );
        const finalState = store.getState();

        res.status(200).end(renderFullPage(initialView, finalState));
      });
    }
  );
});

// start app
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${PORT}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
