# Flagship QA Front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## QA app implementation

Please read the README_QA doc to implement inside your backend QA app

## Add a new feature

### Step 1 : check that the feature does not exists
Pull the latest master branch
check the `constants/features.js` files to see if a similar feature does not exist

### Step 2 : Create your new html component in the Vue app

### Step 3 : Condition the display of the feature
Use the `isEnabled` method to condition the display

```html
<div v-if="isEnabled(FSFeatures.V2.pollingInterval)">
    <!--
        Your feature here
    -->
</div>
```

### Step 4 : 
