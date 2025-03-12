# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## My Notes

- There's potentially a bunch of other material things I want to install listed at https://mui.com/material-ui/getting-started/installation/. Currently I just have the minimum material stuff included.

To get things running:

```bash
nvm use 22 # Or whatever version of node you have installed
npx expo start
```

To build web app into docker container:

```bash
npx expo export --platform web
docker build -t mordheim_app .
docker save mordheim_app -o mordheim_app_image.tgz
```

## Ideas

- Have "profiles" which have different sets of favourites. So you can have different profiles per warband.
  - Allow exporting / importing profiles.
- Tools for rolling commonly done dice, need some way to record these as well. Integration with Discord would work (e.g. automatically post the results when rolled) e.g.:
  - Exploration
  - Level ups
  - Deaths / injuries

## Things to check out later

https://react-hook-form.com/? - Looks good if I'm going to support making more interesting changes.
https://redux.js.org/tutorials/essentials/part-5-async-logic - I played around and setup stuff for retrieving some data from an API but not for updating it. When I add that this will be a useful resource.
