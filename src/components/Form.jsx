import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchButton from '@mui/icons-material/Search';

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
        console.log('Button Working');
    }

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
                    disableClearable
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
                    color="primary"
                    aria-label="search Github Topics"
                    size="large">
                    <SearchButton fontSize='large' />
                </IconButton>
            </Stack>
        </div>
    )
}