# Toi blog

Toi blog is a web app which allows you to create easily a blog.

The system provide:

* Comment system
* Administration

## TODO list

* [x] Vue index/home
* [x] Vue index by tag
* [x] Vue post
* [x] Vue user profile
* [x] Admin blog
  * [x] Edit posts (editor WYSIWYG)
  * [x] Setup all forms to manage the blog
* [x] OAuth connection
* [ ] Add a page to edit own posts and another to edit one
* [x] Edit toolbar menu (user > connect / disconnect + my profile)
* [ ] Check themes on all pages
* [ ] Search Module

## Installation

The following instructions are here to help you to setup Toi.

Install dependencies by:

> pip3 install -r requirements.txt

* Edit *settings.py*
  * Set debug to `False`
  * Configure the database
    * Create a database file
    * Or setup a connection to a mysql server
* Create an user account
  * `python3 manage.py createsuperuser`
* Enjoy !

## Access to Admin

An administration is provided by Toi blog through this access: `https://your.domain.com/admin/`