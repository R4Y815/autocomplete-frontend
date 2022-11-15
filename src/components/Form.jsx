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

    // FN: Send Character inputs to Backend
    /*     const sendInputsToBackEnd = async (userChar) => {
            console.log('input at sendInputsToBackend =', userChar);
            const inputPkg = { input: userChar };
            await axios.post(`${REACT_APP_BACKEND_URL}/autocomplete`, inputPkg).then((result) => {
                console.log('received Autocomplete search = ', result.data.possibles);
                const temp = Array.from(result.data.possibles);
                setPossibles(temp)
            }).catch((error) => {
                console.log(error);
            })
        } */

    // FN: Controlled Form Inputs and send inputs to backend for GitHub API search
    //     issue with something 1 character less per POST if using CallBack
    const handleInputChange = async (event) => {
        const input = event.target.value;
        setKeyword(input);
        console.log('input after setting = ', input)
        if (keyword.length > 1) {
            console.log('input before sending', input)
            const inputPkg = { input: input };
            await axios.post(`${REACT_APP_BACKEND_URL}/autocomplete`, inputPkg).then((result) => {
                console.log('received Autocomplete search = ', result.data.possibles);
                const temp = Array.from(result.data.possibles);
                setPossibles(temp)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // FN: Set User Selection to be keyword
    const handleChosenWord = (event, value) => {
        const selected = value;
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