# Design Open Board

![Build status](https://travis-ci.org/DesignOpen/board.svg)

Job board which open source projects can use to find design contributors.

## Infrastructure

All parts of the service are hosted in Heroku.
There are two environments:

* **qa** http://designopen-board-qa.herokuapp.com
* **production** http://designopen-board.herokuapp.com

These environments are replicants of each other, they both have these addons:

* MongoLab for database
* Papertrail for centralized logging handling

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

### 3. Install npm modules:

In project root:

    npm install


## Development

To start local server:

* In first terminal, run `npm start` in the root of the project
* In second terminal, run `npm run watch`. That'll watch changes in stulys and jsx files.

There's no live reload.

### Releasing

Release flow:

1. Merge changes to master
2. Wait for green light in CI
3. Push changes to desired environment, for example **qa**:

    git checkout master
    git push qa

4. Check that the environment responds and logs look ok


## API


### Routes

Get user
    GET /users

Create user
    POST /users

Get user with id
    GET /users/:id

Update user with id
    PUT /users/:id

Create new post
    POST /posts

Get post with id
    GET /posts/:id

Update post with id
    PUT /posts/:id


### Models

#### Post

```
{
    "description": "",
    "author": "",
    "project": "",
    "created_at": "",
    "modified_at": "",
    "content": "",
    "title": ""
}
```

#### User

```
{
    "name": "",
    "github_user":
}
```
