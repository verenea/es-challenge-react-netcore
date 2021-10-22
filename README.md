# ES Software Search Challenge

This project is a small React/ASP.NET Core SPA app to demonstrate the ability to quickly set up an application using front- and backend principles. The requirements were to create a minimal, workable search page that will return results from a static local dataset of software versions that are greater than the input provided by the user.

## Prerequirements

* Visual Studio 2019+
* .NET Core SDK

## How To Run

* Open solution in Visual Studio
* Run the application. 
* The necessary client dependencies should automatically install the first run, so this will take a moment the first go-round. Alternatively you could cd into ClientApp folder and run `npm install` first.

 
## Todo

- Convert HomePage class and local state management to function with hooks
- Restyle app with richer UI components
- Implement graphical loader
- Implement virtual scrolling or pagination (for future datasets of thousands)
- Implement ordering feature (and other standard UI query interaction features, options)
- Item detail hydration and display
- Buffered on-demand search results for immediate results
- Maybe integrate query library and database context framework (such as EF)
- Design backend error handling schema
- Implement unit testing on front and backend
- Implement proper linting
