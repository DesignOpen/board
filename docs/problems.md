Problems

* how to organize code

    Server borrows code from frontend so there's no shared directory

* Data managing

    Server fetches from db, client from /api/* with ajax.

* When do you know if DOM and browser APIs available?

    render: no browser environment
    componentDidMount: browser environment

* Routing?

    Use express routing still in server side for /api and static files,
    all other routes are delegated to react router.


* Frontend vs backend architecture

    Fluxible: flux everywhere
    I prefer more traditional separation of backend and frontend
