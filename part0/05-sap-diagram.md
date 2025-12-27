# 0.5: Single page app diagram

sequenceDiagram
    participant Browser
    participant Server

    %% visits Single page app url
    Browser->>Server: GET /spa
    activate Server
    Server-->>Browser: HTML, CSS, JS
    deactivate Server

    %% types a note
    Browser->>Browser: User enters note in #new_note_spa form
    Browser->>Browser: Submit event handler runs (preventDefault)
    Browser->>Browser: Create note object, update DOM

    %% send note to server
    Browser->>Server: POST /notes (JSON)
    activate Server
    Server-->>Browser: 201 Created / confirmation
    deactivate Server
