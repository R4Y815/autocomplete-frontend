# Autocomplete-Frontend Readme

This is a simple JavaScript (ReactJs) frontend that autocompletes search terms for GitHub **Topics** , bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>

Upon user selecting/completing the search term, it is sent by a simple Node.js server, [autocomplete-backend](https://github.com/R4Y815/autocomplete-backend), to [GitHub Search API](https://docs.github.com/en/rest/search).


Up 100 search results are returned in the browser console as JavaScript objects in an array (`'results.data.items'`).



## **Important Notes:** <br>
   -  **Autocomplete feature** <br>
       For every character entered after the first character, 
       an AJAX request is made to GitHub Search API to fetch 
       possible topics based on the current string in the search box. 
       Up to 5 suggestions are returned per character entry.
      
   - **Rate Limit**<br>
      For unauthenticated requests the rate limit is 
      10 requests per minute. So the autocomplete
      would work only for search terms up to 10 letters
      in length (with no other keystrokes typed) <br>

      For requests using Basic Authentication, OAuth, 
      or client ID and secret, the autocomplete would work only for search terms up to 30 letters
      in length (with no other keystrokes typed) <br>

      Source: [Github Search API](https://docs.github.com/en/rest/search#rate-limit) <br>

   - **Personal Authentication Tokens**<br>
      To make Basic Authentication requests to GitHub Search API, you can create personal tokens. See [here.](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) <br>


      **Scope**<br>
      Tokens created must have the required scopes to work. See [here](https://docs.github.com/en/rest/search#access-errors-or-missing-search-results). <br>
      Results returned from the proxied search are from repositories (**repo** scope).<br>
      For this frontend, the minmum scope access requirement is **repo**. <br>
      *Take note to enable only the minimum required scopes when creating your Github personal access token.* <br>
      See [here](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#about-tokens).
        

  

## **Instructions to run on Visual Code Studio:**
   1. In a new folder, git clone this repo onto the local machine.  <br>
      In the new bash terminal pane (you can use hotKey: Ctrl + Shift + `` ` `` to open a new terminal), type the following code:<br>
        `git clone https://github.com/R4Y815/autocomplete-frontend.git`

   2. Change the working directory to the newly cloned repo directory holding the frontend. <br>
        `cd autocomplete-frontend`
   3. Install all dependencies for the frontend locally:<br>
        `npm i`
   4. Create Personal Access Token from GitHub. See [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for instructions <br> 
   Paste the token into somewhere safe on your local machine for the time being.<br>

   5. Create a new .env file in the local repo for autocomplete-frontend: <br>
        `touch .env`<br>
   6. Copy the code contents of  file '.env-example' into file '.env'. Replace ``<PERSONAL AUTH TOKEN FROM GITHUB>`` with your GitHub Personal Access Token. <br>
      *Ensure that the Personal Access Token remains enclosed in quotes* (Eg: ***"***``aasdfwertwtsdasdg234asdfase``***"*** )

   7. Return to parent directory:<br>
        `cd ..` 
   8. Repeat steps 1-3 to clone the backend repo and install all the dependencies for the backend locally: <br>
        `git clone https://github.com/R4Y815/autocomplete-backend` <br>
        `cd autocomplete-backend` <br>
        `npm i`<br>

   9. In the current bash terminal, run the autocomplete-backend Node.js server first in development mode: <br>
        `npm run start`
   10. Open a second, new bash terminal. (Ctrl + Shift + `` ` ``). <br>
   11. Change the working directory to the directory of autocomplete-frontend:<br>
        `cd autocomplete-frontend`
   12. In this second bash terminal, run the frontend: <br>
        `npm run start`<br>
        *If a new browser window doesn't open automatically, open one and go to this address: http://localhost:3000/* <br>
        *You should see a page like this:* <br>


         <image src ="https://lh3.googleusercontent.com/xQksKvRKxnM0wurF5TaahN-GwJrnuudnCZ6-t0olh6r9s1X_Z7j3DEQiugioNZpKYEuR55mdZy3mGQ-37IAnMLQCgG2bSZdGDemVNyEIHLNI0sLVbbxAG2AU4zNf1ANAFr3FNB8AFA=w600-h315-p-k" alt="autocomplete-frontend-photo" width="400"/> <br>


## **To Do:**
   1. Move most of the code involving the auth token to the backend server so that the auth token is not exposed front-end. [DONE]
   2. find a way to deal with the rate limit in code or inform the user about it. 
   3. If error happens, have to inform the user. [DONE]
   4. Fix High vulnerabilities

          Readme ver. 1: 11/10/2022



