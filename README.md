# Toi blog

Toi blog is a web app which allows you to create easily a blog.

The system provide:

* Comment system
* Administration

## TODO list :

* [x] Vue index/accueil
* [x] Vue index par tag
* [x] Vue post
* [x] Vue user profile
* [ ] Admin blog
  * [ ] Edit posts (editor WYSIWYG)
  * [ ] Setup all forms to manage the blog

## Installation

The following instructions are here to help you to setup Toi.

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