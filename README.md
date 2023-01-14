## Links

Front-end (2 UI's, ABBA testing):

- Statistics UI (
  A): [picasso.experiments.cs.kuleuven.be:3470?ui=statistics](picasso.experiments.cs.kuleuven.be:3470?ui=statistics)
- Sports coach UI (
  B): [picasso.experiments.cs.kuleuven.be:3470?ui=sportscoach](picasso.experiments.cs.kuleuven.be:3470?ui=sportscoach)

Back-end:
[https://sportify-hci.ew.r.appspot.com/](https://sportify-hci.ew.r.appspot.com/). You can test an
endpoint: [https://sportify-hci.ew.r.appspot.com?most-popular-sports](https://sportify-hci.ew.r.appspot.com?most-popular-sports)
. Beware it can take a few seconds foor google cloud to spin up an instance.

## Context

The application consists of 2 parts:

- Front-end, deployed on picasso server.
- back-end api with noSQL firestore database, deployed on google cloud.

The front-end is a simple react app, deployed on the picasso server, which contains a Dockerfile and docker-compose that
runs the entrypoint (clone git repo). The back-end is the api that does the recommendations, it uses
a simple [content-based recommender](https://www.npmjs.com/package/content-based-recommender) to calculate a cosine
similarity factor between [tags](back-end/src/data/sports.ts) of the chosen 'preferences' sports and every other sport,
and returns the top 5.

Both can be run locally if you wish, by navigating to the relevant subdirectory (front-end or back-end) and
executing `npm start` in both directories. Although both are deployed so this isn't necessary.