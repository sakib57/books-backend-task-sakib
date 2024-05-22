Title
==========================
Book API



Description
==========================
An API project, in this project there are some entities like Book, Author and Genre. A book contains title, author, list of genre, publication date etc.
Authentication and role based Authorization has been implemented. Here are some features,
-> Admin user need to be created during deployment
-> Any registered user will have default role USER
-> Only admin can update a user and assign their role as ADMIN, EDITOR etc.
-> Only admin and editor can create genre, author and book, Other user can view the list or single entity.
RESTful API and GraphQl API both are implemented in this project.

REST API documentetion is available at
http://localhost:<PORT>/swagger and

GraphQl playground is available at
http://localhost<PORT>/graphql

.env.example file should be renamed as .env and set proper values for environment variables mentioned in this file.



Instructions
============================
After clone this project run following commands
run: npm install
run: npm run start / npm run start:dev



Drawbacks and Corrections
=============================
There are some drawbacks and these are need to be corrected in the future

1. Proper exception handling in http requests and business logics.
2. Proper schema defenition and proper field definition.
3. Unit testing and user testing
4. Increase security measurements