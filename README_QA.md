# Initialization

## As a simple QA App user

### Add the index file on the root of the assets/public folder

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://flagship-qa-front.netlify.app/qa.umd.js"></script>
  </head>

  <body>
    <div id="app">
      <qa
        :technology="technology"
        :branch="branch"
        :features="features"
        :environment="environment"
      ></qa>
    </div>

    <script>
      var app = new Vue({
        el: "#app",
        data: {
          technology: "Go",
          branch: "qa",
          environment: "prod",
          features: null,
        },
      });
    </script>
  </body>
</html>
```

You can then customize the data to display the QA App

## As a contributor of the flagship-qa-front app

### Add the flagship-qa-front git as submodule inside the assets/public folder

### Run `npm install` in the flagship-qa-front folder

### Add the index file on the root of the assets/public folder

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="./flagship-qa-front/dist/qa.umd.js"></script>
  </head>

  <body>
    <div id="app">
      <qa
        :technology="technology"
        :branch="branch"
        :features="features"
        :environment="environment"
      ></qa>
    </div>

    <script>
      var app = new Vue({
        el: "#app",
        data: {
          technology: "Go",
          branch: "qa",
          environment: "prod",
          features: null,
        },
      });
    </script>
  </body>
</html>

```

### Features usage in the QA App

Fill out the "env" property of the <qa> tag with the features you have implemented in your SDK

# Running locally

## Configure IDE or run command `npm run build-watch` on the assets/public folder

## Add a static hosting in your QA app for the assets/public folder

# Features implementations

## Environment (codename `env`)

API Endpoints:

### GET `/env`:

return
```
{
    environment_id: "env_id",
    api_key: "api_key",
    timeout: 100,
    polling_interval: 3000
}
```

### POST `/env`:

Body parameters:
- environment_id (string)
- api_key (string)
- timeout (integer): the timeout in seconds
- polling_interval (integer): the timeout in seconds
