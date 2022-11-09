import React, { useState, useRef, useEffect } from 'react';

// from component folder
import { Octokit } from "@octokit/core";


// GLOBAL Auth from Octokit for GitHub API
const ghToken = process.env.REACT_APP_GH_TOKEN;


export default function Form() {
    // STATES
    const [keyword, setKeyword] = useState('');
    const [possibles, setPossibles] = useState([]);

    // REFS
    const input1Ref = useRef();

    // FN: CLEAR INPUTS
    const clearInputs = () => {
        input1Ref.current.value = '';
    }

    // FN: Check Rate Limit
    /* const checkRate = () => {
        const octokit = new Octokit({
            auth: ghToken
        })
        octokit.request('GET /rate_limit', {}).then((response) =>
            console.log(`Limit: ${response.data.rate.limit} | Remain: ${response.data.rate.remaining}`)
        );
    } */

    // FN: RUN SEARCH for Each letter input:
    const possibleWords = async (keyword) => {
        const octokit = new Octokit({
            auth: ghToken
        })
        await octokit.request(`GET /search/topics?q=${keyword}&per_page=5`, {})
            .then((results) => {
                const tempTitles = [];
                const items = results.data.items;
                const blankArray = [];
                setPossibles(blankArray);
                items.forEach((x) => {
                    if (x.name.includes(keyword)) { tempTitles.push(x.name) }
                });
                setPossibles(tempTitles);
                /* checkRate(); */
            })
            .catch((error) => {
                console.log(error);
            })

    }


    // FN: Controlled Form Inputs
    const handleInputChange = (event) => {
        const input = event.target.value;
        console.log('input = ', input);
        if (input.length > 1) {
            possibleWords(input);
        }
    }

    const possibleChoices = possibles.map((fullWord, index) => (
        <li key={index}> {fullWord}
        </li>
    ));


    return (
        <div>
            <input
                ref={input1Ref}
                type="text"
                size="50"
                placeholder="enter your search keywords here"
                onChange={handleInputChange}
            />
            <ul>{possibleChoices}</ul>
        </div>
    )
}