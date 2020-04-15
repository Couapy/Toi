# Toi blog

Toi blog is a web app which allows you to create easily a blog.

The system provide:

* Comment system
* Administration
* Google OAuth connection

## Installation

The following instructions are here to help you to setup Toi.

### Install dependencies

Please install dependencies by:
> pip3 install -r requirements.txt

### Edit configuration

Edit *settings.py* and set **DEBUG** to `False`.
Then add your domain to **ALLOWED_HOSTS**

### Database configuration

By default, django will use `db.sqlite3` database file. If you want to switch to a mysql configuration,
please edit the database variable in *Toi/settings.py* and create a `database.conf` like this:

~~~~Properties
[client]
database = NAME
user = USER
password = PASSWORD
default-character-set = utf8
~~~~

### Create an administrator account

Please run the following command in a terminal :

> python3 manage.py createsuperuser

=> Now you can enjoy !

## Access to Admin

An administration is provided by Toi blog through this access: `https://your.domain.com/admin/`