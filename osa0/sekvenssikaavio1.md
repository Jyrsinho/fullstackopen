sekvessikaavio 
    osallistuja selain
    osallistuja palvelin

    selain ->> palvelin: POST {note: 'hola'}
    palvelin aktivoituu
    päivittää käyttäjän lähettämän uuden noten palvelimen muistiin.
    palvelin ->> selain HTML dokumentti
    palvelin deaktivoituu

    selain ->> palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css 
    palvelin aktivoituu
    palvelin ->> selain: CSS- tiedosto
    palvelin deaktivoituu

    selain ->> palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    palvelin aktivoituu
    palvelin ->> selain: JS -tiedosto
    palvelin deaktivoituu

    Selain suorittaa js-koodia, joka hakee JSONin palvelimelta.
    
    selain ->> palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    palvelin aktivoituu
    palvelin ->> selain: data.json
    palvelin deaktivoituu

    selain renderöi notesit.

    
    