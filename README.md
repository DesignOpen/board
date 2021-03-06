# Design Open Board

[![Build Status](https://travis-ci.org/DesignOpen/board.svg)](https://travis-ci.org/DesignOpen/board)

Job board which open source projects can use to find design contributors.

## Architecture

### Dependencies explained

**Server**

* `express` Backend framework
* `express-session` Express code module
* `body-parser*` Express core module
* `cookie-parser` Express core module
* `errorhandler` Express error handler
* `compression` Enables gzip compression for express
* `ejs` Template language for express html files
* `mongoose` Library for managing data in MongoDB
* `node-jsx` Just-in-time JSX parses to require .jsx files in node
* `passport` Authentication library
* `log4js` Provides better logging than console.log

**Client**

* `bluebird` Best available promise library
* `flux` Facebook's flux library which provides Dispatcher
* `react` Core react library
* `react-router` Router implemented with react

Note that some of the client libraries are also used in server in initial render

**Development**

* `autoprefixer` CSS postprocessor which adds vendor prefixes
* `browserify` Module loader to organize client-side code
* `reactify` Browserify transform to support JSX syntax
* `watchify` Faster version of browserify for local development
* `clean-css` CSS minifier
* `node-inspector` Node debugger. Used in npm run debug-server
* `stylus` CSS preprocessor like SASS/LESS
* `uglify-js` JS minifier
* `watch` Watches changes in a directory and runs given command

### Infrastructure

All parts of the service are hosted in Heroku.
There are two environments:

* **qa** http://designopen-board-qa.herokuapp.com
* **production** http://designopen-board.herokuapp.com

These environments are replicants of each other, they both have these addons:

* MongoLab for database
* Papertrail for centralized logging handling

#### Heroku details

* Heroku builds our web app after each deployment, we have build tools in devDependencies. That's why `NPM_CONFIG_PRODUCTION` is set to `false`. See https://devcenter.heroku.com/articles/nodejs-support

## Install development environment

Guide to get the environment running in your local machine.

### 1. Install tools and tech stack

* Node.js + npm tools
* Heroku toolbelt
* MongoDB
* Editorconfig to your editor

    This way text formatting is consistent within team

* JSHint to your editor

### 2. Configure local environment

Add environment variables to `local-env.sh`.
See [local-env.sh.sample](local-env.sh.sample) for an example configuration.

Add heroku remotes to your git repo:

    git remote add qa git@heroku.com:designopen-board-qa.git
    git remote add prod git@heroku.com:designopen-board.git

If you don't have rights to push to the remote and get this error: `Permission denied (publickey)`. See [Adding keys to Heroku](https://devcenter.heroku.com/articles/keys#adding-keys-to-heroku).

### 3. Install npm modules:

In project root:

    npm install


## Development

This project uses [npm scripts as task automation](http://substack.net/task_automation_with_npm_run).

To start local server:

* In first terminal, run `npm start` in the root of the project
* In second terminal, run `npm run watch`. That'll watch changes in stulys and jsx files.

There's no live reload.

### Database migrations

Database migrations are handled with [node-db-migrate](https://github.com/db-migrate/node-db-migrate). When creating new migration scripts, see their [API documentation](https://github.com/db-migrate/node-db-migrate#migrations-api---sql). **Important:** Their MongoDB driver does not implement many of the functions mentioned in API, check [source code](https://github.com/db-migrate/node-db-migrate/blob/master/lib/driver/mongodb.js). They have documentation also here: http://db-migrate.readthedocs.org/en/v0.9.x/.

**Note:** to use `db-migrate` command, you must install it globally with `npm install db-migrate -g`, otherwise you have to use: `./node_modules/db-migrate/bin/db-migrate`.

Whenever you have data changes in models, you must create a new migration script:

* `db-migrate create descriptive-name-for-the-migration`
* Edit the created migration script template in `./migrations/`


**Migration shortcuts**

* [Column Specs](https://github.com/db-migrate/node-db-migrate#createtabletablename-columnspec-callback)
* [Supported data types](https://github.com/db-migrate/node-db-migrate/blob/master/lib/data_type.js)

### Releasing

Release flow:

1. Merge changes to master
2. Wait for green light in CI
3. Push changes to desired environment, for example **qa**:

    ```bash
    git checkout master
    git push qa
    ```

    You can also release a certain local branch. For example releasing from node branch to **qa**: ```git push qa node:master```


4. Check that the environment responds and logs look ok
