/* eslint-disable indent */
const fs = require('fs');

const IndexPage = (reviewApps = {}, styles = '') => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Review apps</title>
    <meta name="description" content="QA every PR effortlessly">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <style>
      body { font-family: Roboto; }
      ${styles}
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h1 style="margin-top: 30px; margin-bottom: 15px;">
            Static review apps collection
          </h1>
        </div>
      </div>
      ${Object.keys(reviewApps).length === 0 ? 'No apps available yet' : ''}
      ${
        Object.entries(reviewApps).map(([name, reviewApp]) => {
          return `
            <div class="row">
              <div class="col-sm">
                <h2 style="margin-top: 30px;">
                  ${name}
                </h2>
              </div>
            </div>
            <div class="row">
              ${Object.keys(reviewApp.apps).length === 0 ? 'No apps available yet' : ''}
              ${reviewApp.apps.map((app, index) => {
                return `
                  <div class="col-sm">
                    ${Card(app)}
                  </div>
                  ${index % 4 === 3 ?
                   `
                     <div class="w-100"></div>
                   ` : ''}
                `;

              }).join('\n')}
            </div>
          `;
        })
.join('\n')
      }
    </div>
  </body>
</html>
`;

function Card(app) {
  const { name, headCommitId, updatedAt, href, pullRequestUrl } = app;
  return `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">#${headCommitId.substr(0, 12)}</h6>
        <h6 class="card-subtitle mb-2 text-muted">${updatedAt.toLocaleString()}</h6>
        <a href="${href}" class="card-link">App</a>
        ${pullRequestUrl ? `<a href="${pullRequestUrl}" class="card-link">Pull Request</a>` : ''}
      </div>
    </div>
  `;
}

module.exports = IndexPage;
