## Install

https://travis-ci.org/DesignOpen/board.svg

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


## API

Model Post
{
    "description": "",
    "author": "",
    "project": "",
    "created_at": "",
    "modified_at": "",
    "content": "",
    "title": ""
}

User
{
    "name": "",
    "github_user":
}
