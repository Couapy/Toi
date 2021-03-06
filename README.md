# Toi blog

![Units tests](https://github.com/Couapy/Toi/workflows/Units%20tests/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Couapy/Toi/badge.svg)](https://snyk.io/test/github/Couapy/Toi)

Toi blog is a web app which allows you to create easily a blog.

The system provide:

* Comment system
* Administration
* Google OAuth connection

## Installation

The following instructions are here to help you to setup Toi.

**First of all, please setup a new secret key in `settings.py`.**

### Install dependencies

Please install dependencies by:
> pip3 install -r requirements.txt

### Edit configuration

Edit *settings.py* and set **DEBUG** to `False`.
Then add your domain to **ALLOWED_HOSTS**

### Database configuration

Please create a `database.conf` like this to configuration the database connection:

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
