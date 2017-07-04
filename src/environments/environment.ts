// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,

  title: 'Fluance Timetracker - PROD',
  apiBaseUrl: 'http://localhost:8081/'

	// we don't need a port config on the server provide it already
  // apiBaseUrl: 'https://vps-02.fluance.net/'
  
  // title: 'Fluance Timetracker - DEV',
  //apiBaseUrl: 'https://mojito.dev.fluance.net:8443/timetracker'

  // Deployment on Mojito
  // apiBaseUrl: 'https://localhost:8443/timetracker'
};
