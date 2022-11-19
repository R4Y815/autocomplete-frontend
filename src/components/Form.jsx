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
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'

// Modules: for AJAX out to BE
import axios from 'axios';
import { CardContent } from '@mui/material';

// REQUIRED FOR CONNECTION TO BACKEND
// ensure that axios always sends the cookie to the backend server and NOT use CORS
axios.defaults.withCredentials = false;

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';


export default function Form3() {
    // STATES
    // Alert Dialog States
    const [open, setOpen] = useState(false);
    const [errCode, setErrCode] = useState('');
    const [errText, setErrText] = useState('');

    // searchbox States
    const [keyword, setKeyword] = useState('');
    const [possibles, setPossibles] = useState([]);
    const [displayChoices, setDisplayChoices] = useState([]);

    // search Result Output States
    const [resultsSummary, setResultsSummary] = useState({});
    const [resultsDisplay, setResultsDisplay] = useState([]);

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
        window.location.reload();
    }

    // FN: CHECK IF KEYWORD is INSIDE THE RETURNED 100 WORDS
    const checkRelevant = (string01, array01) => {
        for (let i = 0; i < array01.length; i += 1) {
            if (array01[i].includes(string01)) {
                return true;
            }
        }
        return false;

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
        const tempDisplay = [];
        const input = event.target.value;
        const keyCode = event.keyCode;
        let pathRoute = '';
        setKeyword(input);
        if (keyword.length > 0) {
            if ((checkRelevant(keyword, possibles) !== true) && (keyword !== undefined) && keyCode !== 8) {
                const inputPkg = { input: input };
                await axios.post(`${REACT_APP_BACKEND_URL}/autocomplete`, inputPkg).then((result) => {
                    console.log('Path 1 received Autocomplete results from BE = ', result.data.possibles);
                    const temp = Array.from(result.data.possibles);
                    // Push first 5 returned results into temp display
                    for (let i = 0; i < 5; i += 1) {
                        if (temp[i] !== undefined) {
                            tempDisplay.push(temp[i])
                        }
                    }
                    setDisplayChoices(tempDisplay);
                    // store the full list of returned search into possibles
                    setPossibles(temp);
                    pathRoute = '1';
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
            } else {
                setKeyword(input);
                const allRelevantPossibles = [];
                // grab all titles which include the keyword
                for (let j = 0; j < possibles.length; j += 1) {
                    if (possibles[j].includes(keyword)) {
                        allRelevantPossibles.push(possibles[j]);
                    }
                }
                // of all those titles, pick the first 5 for display as choices

                for (let k = 0; k < 5; k += 1) {
                    if (allRelevantPossibles[k] !== undefined) {
                        tempDisplay.push(allRelevantPossibles[k]);
                    }
                }
                setDisplayChoices(tempDisplay);
                pathRoute = '2';

            }
        } else if (keyword === "") {
            setPossibles([]);
            setDisplayChoices([]);
        }
        console.log('Path = ', pathRoute);
    }
    // FN: Set User Selection to be keyword
    const handleChosenWord = async (event) => {
        console.log('textContent =', event.target.textContent);
        const selected = event.target.textContent;
        setKeyword(selected);
    }

    //FN: Pass Keyword to backend
    const passToBackend = () => {
        console.log('keyword =', keyword);
        if (keyword !== null) {
            console.log('Search term sent to backend...');
            const confirmedTerm = { toSearch: keyword };
            axios.post(`${REACT_APP_BACKEND_URL}/searchGitHubTopic`, confirmedTerm).then((results) => {
                console.log('Results of Backend Call to Github Search API =', results);
                const summary = {
                    total_count: results.data.total_count,
                };
                setResultsSummary(summary);
                const items = results.data.items;
                setResultsDisplay(items);
                console.log(items);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // Call Clear Inputs function so it Listens in Autocomplete Field
    keywordClearOnSelect();



    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            direction="column"
            alignItems="center"
            justify="center"
            style={{
                minHeight: '65',
                width: '300'
            }}>
            <Grid>
                <p style={{ height: '10vh' }}></p>
                <Stack direction='row' spacing={0} sx={{ width: 300 }}>
                    <Autocomplete
                        freeSolo={true}
                        /* has issue with clearing input at some point */
                        onChange={handleChosenWord}
                        id="autocomplete-field"
                        options={displayChoices.map((choice) => choice)}
                        renderInput={(params) => (
                            <TextField
                                sx={{ width: 400 }}
                                onKeyDown={handleInputChange}
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
                        color={(keyword !== "") ? "primary" : "error"}
                        aria-label="search Github Topics"
                        size="large">
                        <SearchButton fontSize='large' />
                    </IconButton>
                </Stack>
            </Grid>
            <Dialog
                open={open}
                onClose={closeAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
            <p style={{ height: '50' }}></p>
            {resultsDisplay.length > 0 &&
                <Badge
                    badgeContent={resultsSummary.total_count}
                    color="primary"
                    max={100} >
                    <ManageSearchIcon
                        color="action"
                        fontSize="large"
                    />
                </Badge>
            }
            {resultsDisplay.map((item, index) =>
                <Grid>
                    <Card key={index} sx={{ width: 350, margin: 0.5 }} >
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {index + 1}) "{item.name}"
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>created by: </span> {item.created_by}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>created at: </span> {item.created_at}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span style={{ fontWeight: 'bold' }}>updated: </span> {item.updated_at}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>

    )
}