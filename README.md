# tern_to_do_list (STEPS app)

To Do List

Advisories:
Keep in mind that for this application that you will have to hand create the database to handle this application. We are still in alpha. Thanks.

What you will be able to do with this app:

- Create to do list items.
- Can delete unwanted to do list items.
- Can check items off as completed.
- Can rearrange to do list items.
- Can log into my account.
- Can edit the text on existing to do's

Specs:

- [x] Visitors can sign up / sign in / sign out
- [x] A logged in user can CRUD `todo list` items
- [x] A logged in user can `complete` and `uncomplete` a `todo list` item.
- [x] A logged in user can sort their `todo list` items
- [x] Has unoffensive and darn near attactive layout / design / style.
- [x] Follow good Git team behaviors (do all your work on branches & submit pull requests for review before merging to master)
- [x] Use `Postgresql`
- [x] Use `node` and `express`
- [X] The artifact produced is properly licensed, preferably with the MIT license.
- [ ] Deploy the app to heroku
![ScreenShot](https://c3.staticflickr.com/8/7752/29127459546_ee93f060e7_b.jpg)

![ScreenShot](http://farm9.staticflickr.com/8621/28606163273_04a097b7fc_b.jpg)

How to get Started: 
- Clone github
- Run 'npm install' on the command line
- Open schema.sql file
- Create a tern_to_do_list database - <a href='https://www.postgresql.org/docs/9.0/static/sql-createdatabase.html'> how to create a database in postgresql </a>
- Create tables for 'users' and 'todo_list_items' based on schema - <a href='https://www.postgresql.org/docs/8.1/static/sql-createtable.html'> how to create a table in postgresql </a>
- Quit out of database using '\q' in command line
- Run 'psql tern_to_do_list < schema.sql' in command line
- Run 'nodemon' or 'npm start' in command line
- Good to go!
