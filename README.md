# Personal Tracking Tool

This is a tool designed to help you track things from your daily life. It gives you a very easy way to input data on a daily basis from your phone, and have it automatically update in a spreadsheet.

Its very early days yet so expect things not to work at first!

## Set up

You'll need a google account, [Node.js](https://nodejs.org/en/) and [clasp](https://github.com/google/clasp).

Clone this repo, and then from within the repo 

```
clasp create --type standalone --title "tracker"
```

Go to google drive and create a new spreadsheet for later, take a note of the ID of the spreadsheet (also in the URL).