# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Git

 I divide this assignment into a few parts. I pushed the changes to GitHub after I finished some part of functions. This will help me to check for changes and find bugs. I added the correct comment for each push to ensure that I can find a solution to the problem.

## Data structures

 Here are three classes to save data.

Users {
Name: string
Admin: bool
Super: bool
Email: string
Grouplist: array
Admingrouplist: array
}

Group {
Name: string
Members: array
Channels: array
Assis: array
}

Channel {
Name: string
Group: string
Members: array
History: string
}

## Angular architecture

1. Components:
   - Login
     Group
     Channel
     Chat (haven’t done)

2. Services:
    - Login (get the current userlists)
      Group (get or modify groups and channels)
      Useradd (add or delete new user and add new group)
      Socket (for chat part)

