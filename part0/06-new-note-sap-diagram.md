# 06: New note in Single page app diagram

sequenceDiagram
    participant Browser
    participant Server

    %% User types a note in the SPA form
    Browser->>Browser: User enters note in form (#new_note_spa)

    %% Form submit triggers event handler
    Browser->>Browser: Submit event handler runs

    %% JS creates new note object and updates UI immediately
    Browser->>Browser: Create note object and push to local notes array then rerender note list in DOM

    %% JS sends new note to the server as JSON
    Browser->>Server: POST /notes Content-Type: application/json into Body: JSON.stringify(newNote)
    activate Server
    %% Server processes new note
    Server-->>Browser: 201 Created / Confirmation
    deactivate Server

    %% Browser shows note 
    Browser->>Browser: Note visible in page 
