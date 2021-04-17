### Investigate

- How a class, in this case Data, could behave like an array when I want to generate entries and a object when I want to juts call `Data.fields.steps`, and not `Data.fields.indexOf(steps)`...
    - Can this even be done with objects?
    ```js
    Data.fields.indexOf({name: "steps"})
    // Or would it need to be something super convoluted like:
    Data.fields.filter(o => o.name == "steps")[0]
    ```

- Showing todays results

- Notes Column

- Format checking on input

- Supporting "sets" lists for excercises and notes

- dynamically create columns/entries on form

- look into android hello world (is it even faster?)

- get clasp working

- add binge field as test

- adding further field metadata based on previous values?? Like for steps, buttons to add 100,1000,5000 ? on push ups 1, 5, 10

- Add support for "go" button on mobile

- Refresh button

- implementing hacked dispatcher

- add onEdit functions for sheet, i.e. don't touch the index cols...