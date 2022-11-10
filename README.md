# FE: 
* 1) How to install and run 
* 2) Personal Auth Tokens required (Github, dotenv)
* 3) Usage Limitations : 30 requests per minute means 30 keystrokes per minute max
* 4) Searches Github Topic titles only, but due to Github API able, bring related body content. 

# Autocomplete-Frontend

This is a simple JavaScript frontend that helps autocomplete individual terms to search Github Topics for relevant answers, bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>

Final search request carried out by the Node.js [autocomplete-backend](https://github.com/R4Y815/autocomplete-backend) to [Github Search API](https://docs.github.com/en/rest/search).



## Important Notes: READ THIS FIRST <br>
   1.  **Autocomplete feature** <br>
       For every character entered after the first character, 
       an AJAX request is made to GitHub Search API to fetch 
       possible topics based on the current string in the search box. 
       Up to 5 suggestions are returned per character entry.
      
   2. **Rate Limit**<br>
      For unauthenticated requests the rate limit is 
      10 requests per minute. So the autocomplete
      would work only for search terms up to 10 letters
      in length (with no other keystrokes typed) <br>

      For requests using Basic Authentication, OAuth, 
      or client ID and secret, the autocomplete would work only for search terms up to 30 letters
      in length (with no other keystrokes typed) <br>

      Source: [Github Search API](https://docs.github.com/en/rest/search#rate-limit) <br>

   3. **Personal Authentication Tokens**<br>
      To make Basic Authentication requests to GitHub Search API, you can create personal tokens. See [here.](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) <br>


      **Scope**<br>
      Results returned from the proxied search are from repositories (`repo`scope).<br>
      Take note to enable only the minimum required scopes when creating your Github personal access token.
      See [this](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#about-tokens) and [this](https://docs.github.com/en/rest/search#access-errors-or-missing-search-results).<br>
        

  

## Getting started on Visual Studio Code editor:
   1. In a new folder, git clone this repo onto the local machine.  <br>
      In the new bash terminal pane (you can use hotKey: Ctrl + Shift + `` ` `` to open a new terminal), type the following code:<br>
        `git clone https://github.com/R4Y815/autocomplete-frontend`
   2. Change the working directory to the newly cloned repo directory holding the frontend. <br>
        `cd autocomplete-frontend`
   3. Install all dependencies for the frontend locally:<br>
        `npm i`
   4. Return to parent directory:<br>
        `cd ..` 
   5. Repeat steps 1-3 to clone the backend repo and install all the dependencies for the backend locally: <br>
        `git clone https://github.com/R4Y815/autocomplete-backend`
        `cd autocomplete-backend`
        `npm i`

NEED TO ADD ABOUT COPYING AND PASTING THE PERSONAL ACCESS TOKEN INTO THE .ENV FILE


   6. In the current bash terminal, run the autocomplete-backend Node.js server first in development mode: <br>
        `npm run start`
   7. Open a second, new bash terminal. (Ctrl + Shift + `` ` ``). <br>
   8. Change the working directory to the directory of autocomplete-frontend:<br>
        `cd autocomplete-frontend`
   9. In this second bash terminal, run this frontend:<br>:
        `npm run start`<br>
        *If a new browser window doesn't open automatically, open one and go to this address: http://localhost:3000/* <br>
         <image src ="https://lh3.googleusercontent.com/xQksKvRKxnM0wurF5TaahN-GwJrnuudnCZ6-t0olh6r9s1X_Z7j3DEQiugioNZpKYEuR55mdZy3mGQ-37IAnMLQCgG2bSZdGDemVNyEIHLNI0sLVbbxAG2AU4zNf1ANAFr3FNB8AFA=w600-h315-p-k" alt="autocomplete-frontend-photo" width="400"/>



