# megoapp (mego-client)

Konmego Client App

## indtall quaser cli globally

npm install -g @quasar/cli

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# Fly.io Setup and Deployment

## update quasar config to point to backend on fly.io

first look for the SERVER_URL env var if not found fallback to localhost.

```
   env: {
        SERVER_URL:
          process.env.SERVER_URL ||
          (ctx.dev ? 'http://localhost:3000' : 'https://konmego.fly.dev'),
      },
```

since the site is built and a static version is sent to the front-end we need to pass the SERVER_URL to the docker container

```
# Build with environment variables
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}
RUN quasar build
```

then on deploy do this:
fly deploy --build-arg SERVER_URL=https://konmego.fly.dev
