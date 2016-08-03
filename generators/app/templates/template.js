"use strict";
/* eslint react/jsx-filename-extension: 0 */

import React from "react";
import ReactDOM from "react-dom/server";
import Helmet from "react-helmet";

function Document(props) {
  const { html, head } = props;
  const { lang, ...attrs } = head.htmlAttributes.toComponent();

  return (
    <html lang={lang} {...attrs} >
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body>
        <div
          id="react-main-mount"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {head.script.toComponent()}
      </body>
    </html>
  );
}
Document.propTypes = {
  html: React.PropTypes.string,
  head: React.PropTypes.any.isRequired
};

function render(templateParams) {
  // Helmet render tags
  ReactDOM.renderToStaticMarkup(
    <Helmet
      title={templateParams.htmlWebpackPlugin.options.title}
      htmlAttributes={{
        manifest: templateParams.htmlWebpackPlugin.files.manifest,
        lang: "en"
      }}
    />
  );
  return ReactDOM.renderToStaticMarkup(
    <Document head={Helmet.rewind()} />
  ).replace(/data-react-helmet="true"/g, "");
}

render.Document = Document;
module.exports = render;
