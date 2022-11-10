// Modules: React, MUI
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchButton from '@mui/icons-material/Search';

// Modules: GitHub 
import { Octokit } from "@octokit/core";

// Modules: for AJAX out to BE
import axios from 'axios';

// GLOBAL Auth from Octokit for GitHub API
const ghToken = process.env.REACT_APP_GH_TOKEN;

// REQUIRED FOR CONNECTION TO BACKEND
// ensure that axios always sends the cookie to the backend server
axios.defaults.withCredentials = false;

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export default function Form() {
    // STATES
    const [keyword, setKeyword] = useState('');
    const [possibles, setPossibles] = useState([]);

    // FN: CLEAR INPUTS IN AUTOCOMPLETE 
    //     - when clearIcon is clicked
    const keywordClearOnSelect = () => {
        const close = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];
        if (close !== undefined) {
            close.addEventListener("click", () => { setKeyword(''); });
        }
    }


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
        setKeyword(input);
        console.log('input = ', keyword);
        if (keyword.length > 0) {
            possibleWords(input);
        }
    }

    // FN: Set User Selection to be keyword
    const handleChosenWord = (event, value) => {
        const selected = value;
        console.log('selected = ', selected);
        setKeyword(selected);
    }

    //FN: Pass Keyword to backend
    const passToBackend = () => {
        if (keyword !== null) {
            console.log('Search term sent to backend...');
            const confirmedTerm = { toSearch: keyword };
            axios.post(`${REACT_APP_BACKEND_URL}/searchGitHubTopic`, confirmedTerm).then((result) => {
                console.log('Results of Backend Call to Github Search API =', result);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // Call Clear Inputs function so it Listens in Autocomplete Field
    keywordClearOnSelect();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <p style={{ height: '33vh' }}></p>
            <Stack direction='row' spacing={0} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo={true}
                    onChange={handleChosenWord}
                    id="autocomplete-field"
                    options={possibles.map((possible) => possible)}
                    renderInput={(params) => (
                        <TextField
                            sx={{ width: 400 }}
                            onChange={handleInputChange}
                            {...params}
                            label="Search GitHub Topic for:"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <IconButton
                    onClick={passToBackend}
                    color={keyword.length > 1 ? "primary" : "error"}
                    aria-label="search Github Topics"
                    size="large">
                    <SearchButton fontSize='large' />
                </IconButton>
            </Stack>
        </div >
    )
}