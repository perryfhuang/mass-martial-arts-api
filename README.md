# Mass Martial Arts API

The API for Mass Martials Arts is built with Express, MongoDB, and Mongoose. Users and gyms are the two resources that I modeled using Mongoose. These documents are stored in a non-relational database, MongoDB. Using Express, I constructed the API routes for creating, reading, updating and deleting 'gyms'. I've required user/token authentication for these actions with the help of crypto (to generate the tokens) and Passport (authentication middleware used with Express). I used bcrypt to hash user passwords and ensure safe, secure storage in the database. Several user routes were also written in order to support login, logout, sign up, and change password functions.

## Important Links

- [Mass Martial Arts App](https://perryfhuang.github.io/mass-martial-arts-client/)
- [Mass Martial Arts Client GitHub Repo](https://github.com/perryfhuang/mass-martial-arts-client)

## Planning Story

Starting out, I wanted the gym resource to have reviews as a subdocument, as well as a rating system. I envisioned it to be like yelp, but for martial arts gyms. I quickly had to reprioritize what features I wanted in my app due to time constraints and later decided to not include a reviews system. I did add other required fields to the gym model in Mongoose including a link to the gym's website. In version one of the API, each gym document contains the keys: gym name, owner (a reference to Mongoose user ID), concentration, address, zip code, link to website, and hours. For this one resource, I only had to declare 5 different API routes: index, get/show, create, update, and delete. In order to filter gyms by training concentration, I simply executed an index request, then filtered by concentration using a custom Handlebars 'if' helper. I also used Handlebars to restrict access to updating/deleting gyms unless the user is the owner of the gym. Again, a custom Handlebars 'if' helper enabled this. Thus, all of the filtering and output to the user is done on the front end using Handlebars/jQuery insertion to the DOM; on the backend, the same index/get request is being executed! I also included a feature where opening an update gym form autopopulates the field with the current information of the gym. This was also done with Handlebars/jQuery by taking values from the API and setting the values as data attributes to each gym's update button, and then setting the form fields by grabbing the data attribute values from the button.

## API End Points

| Verb   | URI Pattern        | Controller#Action       |  Token Required |
|:-------|:-------------------|:------------------------|-----------------|
| POST   | `/sign-up`         | `users#sign-up`         |   `false`       |     
| POST   | `/sign-in`         | `users#sign-in`         |   `false`       |
| PATCH  | `/change-password` | `users#change-password` |   `true`        |
| DELETE | `/sign-out`        | `users#sign-out`        |   `true`        |
| GET    | `/gyms`            | `gyms#index`            |   `true`        |
| GET    | `/gyms/:id`        | `gyms#show`             |   `true`        |
| POST   | `/gyms`            | `gyms#create`           |   `true`        |
| GET    | `/gyms/:id`        | `gyms#update`           |   `true`        |
| DELETE | `/gyms/:id`        | `gyms#delete`           |   `true`        |

All data returned from the API is formatted as JSON.

### User Stories

1. As a user, I want to be able to GET list of ALL gyms in the database and GET list of gyms by martial arts concentration.
2. As a user, I want to be able to GET/view details of gyms including: name of gym, type of training, description, owner/creator of gym profile (contact info on user profile), address/location, hours, photos, videos, link to own website, reviews
3. As a user, I want to be able to write reviews on gyms (maybe upload pictures/videos with the review?) and include a rating out of 5 stars.
4. As a gym owner/employee, I want to be able to CREATE a gym profile of my gym, and UPDATE that gym profile, which includes the details listed in user story 2.
5. As a user, I want to be able to learn more about each type of martial art (maybe I have no idea what Brazilian jiu jitsu is and I want to find out more - maybe a quick about page for each concentration - and also what gym can I check out to get started?).

### Technologies Used

- Express
- MongoDB
- Mongoose
- JavaScript
- NodeJS
- nodemon
- Passport
- bcrypt
- crypto

### Future Iterations

Future iterations will include reviews as subdocuments in the gym model. I also hope to include picture and video uploads by both gym owners and in user reviews. I want to incorporate a rating system that includes automatically calculating the average rating of a gym based on registered reviews in the database. This would involve development in both the API and with Mongoose. Another feature I would like develop is a user profile page, where users can upload profile pictures and update information about themselves such as what gym they train at, what concentrations they train in, how long they have been training, pictures/videos of themselves training, etc. This would involve updating the user model using Mongoose.

### Entity Relationship Diagram (ERD)
![ERD](https://i.imgur.com/6NBMx3B.jpg "ERD")
