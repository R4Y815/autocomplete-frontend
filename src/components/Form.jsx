// Modules: React, MUI
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchButton from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Modules: for AJAX out to BE
import axios from 'axios';


// REQUIRED FOR CONNECTION TO BACKEND
// ensure that axios always sends the cookie to the backend server and NOT use CORS
axios.defaults.withCredentials = false;

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export default function Form() {
    // STATES
    // Alert Dialog States
    const [open, setOpen] = useState(false);
    const [errCode, setErrCode] = useState('');
    const [errText, setErrText] = useState('');

    // searchbox States
    const [keyword, setKeyword] = useState('');
    const [possibles, setPossibles] = useState([]);

    // Alert Box Variables: 
    const CODE_503 = '503 - Service Unavailable';
    const TEXT_503 = 'Backend Server is down.';
    const CODE_403 = '403 - Bad Request/ Limit Exceeded';
    const TEXT_403 = 'You have exceeded all Github Search API rate limit on number of search requests per minute. Unauthenticated - 10 requests per minute. Authenticated - 30 requests per minute. Please try again later.';
    const CODE_DEFAULT = 'ERROR!';
    const TEXT_DEFAULT = 'Autocomplete service is not working';

    // FN: CLEAR INPUTS IN AUTOCOMPLETE 
    //     - when clearIcon is clicked
    const keywordClearOnSelect = () => {
        const close = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];
        if (close !== undefined) {
            close.addEventListener("click", () => { setKeyword(''); });
        }
    }
    // FN: ALERT DIALOG OPEN
    const openAlert = () => {
        setOpen(true);
    }
    // FN: ALERT DIALOG CLOSE
    const closeAlert = () => {
        setOpen(false);
    }

    // FN: Send Character inputs to Backend (Callback)
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
                const code = error.code;
                switch (code) {
                    case 'ERR_NETWORK':
                        setErrCode(CODE_503);
                        setErrText(TEXT_503);
                        break;
                    case 'ERR_BAD_REQUEST':
                        setErrCode(CODE_403);
                        setErrText(TEXT_403);
                        break;
                    default:
                        setErrCode(CODE_DEFAULT);
                        setErrText(TEXT_DEFAULT);
                }
                openAlert()
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
            <Dialog
                open={open}
                onClose={closeAlert}
                aria-labelledby="alert-dialog-title"
                aria-descrivedby="alert-dialog-description">
                <DialogTitle>
                    ERROR: {errCode}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAlert}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}