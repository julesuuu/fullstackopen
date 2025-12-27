# 04: New note diagram

sequenceDiagram
    participant Browser
    participant Server

    %% This, when you visit the link, it fetches the html code which got the content and structure
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: (HTML document)
    %% server returns the html document to the browser
    deactivate Server
    %% browser fetches the css from the server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    %% server returns the css file
    Server-->>Browser: (CSS file)
    deactivate Server
    %% browser fetches the javascript from the server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    %% when it get back to the browser it runs it to get request to the address and make the json data as notes
    Server-->>Browser: (JavaScript file)
    deactivate Server
    %% by the time it gets the data there's an event handler to process notes to the page via DOM-API 
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    %% render the notes to the browser of what I've typed
    Server-->>Browser: (JSON file)
    deactivate Server
