# API To Do
Back-end application to build a to-do list.

# Features

## Logs

**Register logs**
***

- [ ] All requests must be registered into a database table.

## Project

**Create project**
***

- [x] Should be possible create a project.
- [x] Should be possible set members on creation by email.
- [ ] Should send an invite email to members not found.
- [x] Should be possible set members permissions on creation.
- [x] Must request authentication.
- [x] Must request a name.

**List projects**
***

- [ ] Should be possible list projects.
- [ ] Must request at least view permission to projects on list.

## User

**Create user**
***

- [x] Should create an user by name, email and password.
- [x] Should not create two or more users with same email.
- [x] Password must contain from 8 to 16 characters.
- [x] Password must contain upper case.
- [x] Password must contain lower case.
- [x] Password must contain number.
- [x] Password must contain special character.
- [x] Should receive only valid emails.
- [x] Should receive only valid names.

**Authenticate user**
***

- [x] Should authenticate an user by email and password.
- [x] User should be able to choice if the authentication will be valid for 1 or 30 days.