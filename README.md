# Personal Tracking Tool

This is a tool designed to help you track things from your daily life. It gives you a very easy way to input data on a daily basis from your phone, and have it automatically update in a spreadsheet.

Its very early days yet so expect things not to work at first!

## Set up

There are two options for the initial cloning.

1. Create an Apps Script project and manually copy all the files over one by one, making sure all the names match exactly.
2. Use [clasp](https://github.com/google/clasp), the Apps Script Command Line tool. It may take some installation, but once its installed, you can push all the project with one command.

### Using clasp to clone the project

You'll need a google account, [Node.js](https://nodejs.org/en/) and [clasp](https://github.com/google/clasp) will need to be installed on your local computer. Once intsalled be sure to login to clasp from the command line `clasp login`.

Go to scripts.google.com and create a new Apps Script project. Take note of the script ID which is in the URL:

> https://script.google.com/home/projects/[SCRIPT_ID]/edit

Go to your development directory, or the directory where the project will be. Don't create a folder for it.

```bash
git clone git@github.com:iansedano/tracker.git
```

That will create the folder. Go into the folder and there:

```bash
clasp clone [SCRIPT_ID]
```

This will add a .clasp.json and an appsscript.json file. Then you can:

```bash
clasp push
```

Which should update the Apps Script project with all the files cloned from the repo.

From here on you can edit solely in the Apps Script project or in your local folder. Just remember when developing locally to `clasp pull` to pull any changes from the Apps Script project online, and `clasp push` to push any local changes.

### Linking script with a Spreadsheet

Go to Google drive and create a new spreadsheet. Take note of the id from the URL.

> https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=0

Then, in the source code, create a new file in the root folder called `config.js` or if you are in the online editor, `config.gs`, and add in one line

```js
const SSID = "[SPREADSHEET_ID]"
```

Change the name of the sheet from "Sheet1" to "Tracking" - be sure its with a capital T!

If you have edited this locally, remember to:

```bash
clasp push
```

### Populating the Spreadsheet

Now you can decide what to track, for instance, the initial set-up might look like this:

|  | A | B | C | D | E | F | G |
|-|-|-|-|-|-|-|-|
| 1 | year | month | day | steps | minutes meditated | mood | push-ups |
| 2 | index | index | index | replace | increment | average | list |

(The numbers in the first column and letters in the top row are just there to show where they need to be in the spreadsheet, they should not be values!)

The first three columns should appear exactly as shown here. They are part of the indexing system to keep track of the day.

The first row is reserved for the title, and the second row is reserved for the metadata about the row. This **must** be, as of 14/05/2020, one of these types:

- `index` - this is for the script and should not be used anywhere except for the first three columns, year, month and day.
- `replace` - any new value for that day will simply be replaced.
- `increment` - any new value will be added to the current amount. So for with "minutes meditated" for instance, you might do 10 minutes in the morning and 10 minutes at midday, and then the value after the second input would be 20.
- `list` - any new value will be kept as a list. so for "push-ups" for instance, this allows you to keep track of sets. So you could do 10 push-ups, input, then 10 more, input and the resultant value would be `10, 10`.
- `average` - this will keep track of the number of inputs and the average value of those inputs. For example, if you input "mood" in the morning as `3`, but then later in the day as `9`, the result would be `6, 2`.


### Deploying the Web App

With all that done you should be ready to deploy the web app.

In the online Apps Script editor, after ensuring all changes have been pushed. Click the "Deploy" button > New Deployment. Press the "Select Type" gear button and select "Web app". In the description just put "init" or something similar, and in the "Execute as" dropdown, leave it as "Me", and "Who has access" also leave it as "Only myself".

Then press "Deploy" and it should prompt you to grant access, warning you that Google hasn't verified the app so you have to say you are ok with that. Then "Allow" the app.

You will then be given a Web app URL where your tracker app should be live!

The site is designed for mobile. It is suggested that you put a shortcut to the URL on your home screen to make it quick and easy to track things!

### Things NOT to do

- Do not put in any notes or data outside the main table. You can manually insert entries, but do not put notes in the rows beneath or to the right of the main table. This is because the script grabs the whole data range dynamically, and if you put some random value in cell `Z1000`, there will be bugs!
- Do not sort the data in the main table. This is because the script uses the last row to check if there is an entry for "today". So if you sort your data so that "today" is on row 3 and the last row is row 100. The script will create another row at the bottom, so now you will have two rows for "today" - not good.
- Do not change the first three columns (Year, Month, Day)
- Do not make columns without a title or metadata row!

### Things you CAN do

- Add columns for categories you want to track at any time. The script analyzes the spreadsheet and creates the form based on the active columns.
- Change the order of the columns

### Things to be careful of

- Watch out for Google Sheets deciding what format your data should be in when adding new lines. It may decide that you want a date, this will change the data. I.e. when you put `12/05/2020` in a cell that is formatted as a date, and then you change the value to "number" the value will actually be `44170`. This will cause bugs.

In the spreadsheet, to prevent Sheets from autoformatting the data (which can change the underlying value and cause bugs), press the top left "origin" cell (left of A, on top of 1) to select all the cells in the sheet, then go to the Menu > Format > Number > Plain Text.