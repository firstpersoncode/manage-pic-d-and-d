// rendering HTML
module.exports = (req, res, next) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Canvas</title>
        <link rel="stylesheet" type="text/css" href="stylesheets/bootstrap.css">
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="javascripts/bundle.js"></script>
      </body>
    </html>
  `;
  res.status(200).send(html);
};
