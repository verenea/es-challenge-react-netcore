# Search Page Exercise

This project is a React SPA to demonstrate the ability to quickly set up a frontend application. The requirements were to create a minimal, workable search page using an API exposed by the ([Algolia](https://www.algolia.com/)) search engine. 

## Get started

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see the app.


## Notes

With the provided api-key ("search-only" I believe), a number of features that I would like to implement -- such as faceted Filters and custom Ranking/Scoring -- appear to be inaccessible or not currently configured. Those settings upon the target index may be managed via an account dashboard or by using `index.setSettings()`, which some users claim to be inaccessible from the JS frontend client version of the InstantSearch api. I will try to find out more information to see if I'm missing some fundamental understanding.

- React-router is used in conjunction with `searchState` to enable search history quasi-routing.
- Material-UI 5.0 is integrated with connected components to enhance component design and functionality
- The latest version of React (17) was used, along with Hooks to manage component state
- A light/dark-mode theme toggle was added to demonstrate context/provider usage
- In lieu of a product image, which is preferable, a barcode was utilized for some graphical distinction
- Typically, a .env file would not have been source-controlled in the repo, but for the sake of this exercise, it is needed for those who need to run the project locally

 
## Todo

- Convert hit details dialog to a routable Detail Page (based off of productId)
- Connect Pager and PageSize dropdown components to a MUI-d version, as they're currently the default InstantSearch version
- Integrate an `<aside>` element that will house proper filtering of Categories, Brand, Tags, etc. This could be done with a customized solution where results are parsed to create possible filters. However, this would have been sort of an anti-pattern since the other widgets being utilized are able to consume the query hits in a manner that is officially documented by Algolia and can seemlessly interface with the search engine during fetch/response 
- Get a better picture of capabilities/limitations for the provided exercise api key to see if faceted results are even possible
- Related to the previous bullet, the search rankings/results really need to be manipulated and configured to display more relevant hits
- Integrate Webpack for finer control of build-time settings, though the CRA react-scripts OOTB tandem work well for this scope
- Find out how to resolve the Image partial paths that are returned with search hits data
- Implement unit testing for components and expected behavior
