# React auto-complete search product list

An auto-complete search app that is built with React 17.0.2. The app provides a rich and dynamic searching experience. Beside the autocomplete-hints that user will recieve while typing, user will also see a dynamic list of products whcih changes on every keystroke. 

## Installation

1. clone master repository.

2. `npm install`

3. `npm run build`
   
4. You can serve the application from build directory using any web server, or by the following:
   1. `npm install -g serve`

   2. `serve -s build` 

## Testing

- App is covered by jest unit testing.
- Run test by `npm run test`

## App Built With

- ReactJS

- TypeScript

- Material-UI

## Additional Packages

- Papa Parse

- React Autocomplete Hint

## Components

- UI Elements: Modal

- Main Components: Input, ProductsList, ProductCard


### Thougts on Some Implementation Details

- After having created initially a traditional drop-down auto suggestions. Given that the products list had to be updated on every keystroke, I thought that an `in-place` autocomplete hints would provide a better user experience. This way, user would clearly see that products are changing while typing, without visual distraction from the drop-down list. Hence, chances would be higher that user could be attempted to check out more products, not only the product s/he is searching for.
