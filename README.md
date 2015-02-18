# Design Open Board

![Build status](https://travis-ci.org/DesignOpen/board.svg)

Job board which open source projects can use to find design contributors.

## Install development environment



Requirements

* node + npm tools
* heroku toolbelt
* mongo
* editorconfig
* jshint

Add heroku remotes to your git repo:

    git remote add qa git@heroku.com:designopen-board-qa.git
    git remote add prod git@heroku.com:designopen-board.git

Install backend and frontend npm modules:

    cd backend && npm install
    cd frontend && npm install

Add environment variables to `local-env.sh`. See [local-env.sh.sample](local-env.sh.sample) for an example configuration.


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
