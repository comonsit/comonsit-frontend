# Comon Sit Ca'teltic Backend
This Django Frontend is a React App, part of the online micro-loans administration web platform
of [Comon Sit Ca'teltic](https://www.comonsitcateltic.com/), a micro loans organization created by indigenous Tseltal producers located in the northern jungle of Chiapas, part of the  [Yomo A'tel](https://yomolatel.org/)  group. It is designed to work with the [ComonSitBackend](https://github.com/comonsit/comonsit-backend),

The project provides api endpoints for:

+ Loan request processes (request, verification and evaluation for approval)
+ Loan administration proviging a summary of each loan and their debts, and mechanisms for extension and forgiveness of interest
+ Payments and the calculation of interest (monthly and daily calculation)
+ Bank reconciliation to match the systems information with the accounting
+ Capital contributions management
+ General information of the users and their communities



## Requirements

1. Create `.env` file with 
   ```bash
   SASS_PATH=node_modules:src
   REACT_APP_ANALYTICS=G-000000000
   REACT_APP_WEATHER_KEY=xxxxxxxxxxx
   REACT_APP_BASE_URL=http://localhost:8000/api
   ```
   
2. Install and start front-end server

   ````
   yarn
   yarn start
   ````

### Considerations

The project is specific regarding:

+ Coops involved (coffee, honey, soap and workers)
+ Accounting numbers for reconciliation are specific to comonsitcateltic
