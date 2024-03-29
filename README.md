# Home Library Service

## Downloading

```
git clone https://github.com/mikitamasliyevich/nodejs2022Q2-service.git
cd nodejs2022Q2-service
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Author

```
Mikita Masliyevich
```

```
Discord: Mikita#8187
```