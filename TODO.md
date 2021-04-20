### NOW

- Get lists working for sets etc

### Primary

- Supporting "sets" lists for excercises and notes
- add binge field as test
- Add support for "go" button on mobile
- Refresh button
- Interfacing the sheet and form to make sure types are enforced, maybe this will involve adding type metadata.
- extending type metadata as key:value pair...
- Maybe having separate table with metadata instead of on same sheet, then presentation sheet. so 3 sheets, one for raw data, one for metadata, one for presentation

**DONE**
- Showing todays results
- get clasp working
- Notes Column
- Format checking on input
- dynamically create columns/entries on form


### Secondary

- interface between sheet and app, that handles row offsets etc. That also constructs the index...i.e. factor out using date as index...
- add onEdit functions for sheet, i.e. don't touch the index cols...
- implementing hacked dispatcher

- adding further field metadata based on previous values?? Like for steps, buttons to add 100,1000,5000 ? on push ups 1, 5, 10


### Investigation

- How a class, in this case Data, could behave like an array when I want to generate entries and a object when I want to juts call `Data.fields.steps`, and not `Data.fields.indexOf(steps)`...
    - Can this even be done with objects?
    ```js
    Data.fields.indexOf({name: "steps"})
    // Or would it need to be something super convoluted like:
    Data.fields.filter(o => o.name == "steps")[0]
    ```
- look into android hello world (is it even faster?)