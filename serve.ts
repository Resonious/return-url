export default async function fetch(request: Request) {
  const url = new URL(request.url);

  let queryView = '';

  let first = true;
  for (const [key, value] of url.searchParams.entries()) {
    queryView += `<div>`
    queryView += first ? '?' : '&amp;';
    queryView += `<span class='key'>${key}</span>=<span class='value'>${value}<span>`
    queryView += `</div>`
    first = false;
  }

  let headerView = '';

  for (const [name, value] of request.headers.entries()) {
    headerView += `<dt>${name}</dt>`;
    headerView += `<dd><pre>${value}</pre></dd>`;
  }

  return new Response(
    `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Return URL inspector</title>

          <style>
            body { font-size: 16px; font-family: monospace; }
            .page {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-top: 30px;
            }

            dt { font-weight: bold; }
            pre {
              overflow-x: auto;
              width: 100%;
              max-width: 600px;
              padding-bottom: 12px;
              margin: 0;
            }

            .url {
              overflow-x: auto;
              padding: 12px;
              max-width: 800px;
            }
            .query > div {
              margin-left: 30px;
            }
            .key { color: darkgreen; }
            .value { color: darkblue; }

            @media (prefers-color-scheme: dark) {
              body {
                background-color: #121212;
                color: #ffffff;
              }
              .key { color: lightgreen; }
              .value { color: lightblue; }
            }
          </style>
      </head>
      <body>
        <div class='page'>
          <div class='url'>
            <div>${url.protocol}://${url.host}${url.pathname}</div>
            <div class='query'>${queryView}</div>
          </div>

          <dl>${headerView}</dl>
        </div>
      </body>
      </html>
    `,

    {
      status: 200,
      headers: {
        'content-type': 'text/html'
      }
    }
  )
}
