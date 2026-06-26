# GET-request https://studies.cs.helsinki.fi/exampleapp/spa
```mermaid

sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server->>Browser: 200 OK html-dokumentti
    deactivate Server
    
    Browser->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server->>Browser: 200 OK CSS
    deactivate Server
    
    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server->>Browser: 200 OK JS
    deactivate Server
    
    Note over Browser: Selain suorittaa JS koodia
    
    Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server ->> Browser: 200 OK data.json
    deactivate Server

    Note over Browser: Selain renderöi muistiinpanot.
        
        
        
    
```

    