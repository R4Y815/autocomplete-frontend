// FN: RUN SEARCH for Each letter input:
const possibleWords = (keyword) => {
    const labelObjects = [];
    const labelsArray = [];
    const guessOutput = [];


    axios.get(`https://api.github.com/search/topics?q=${keyword}&per_page=100`)
        .then((results) => {

            const items = results.data.items
            console.log(results.data.items);
            // Pulling out label names from items: 
            items.forEach((x) => labelObjects.push(x.labels));
            console.log('labelObjects= ', labelObjects);
            labelObjects.forEach((y) => {
                for (let i = 0; i < y.length; i += 1) {
                    labelsArray.push(y[i].name);
                }
            });

            const labelSet = new Set(labelsArray);
            const labelsUnique = Array.from(labelSet);

            labelsUnique.forEach((z) => {
                if (z.startsWith(keyword)) {
                    guessOutput.push(z)
                }
            });

            console.log('guessOuput =', guessOutput);


        })
        .catch((error) => {

            console.log(error);
        })


}

// FN: Check Rate Limit 
//     - to check number of authenticated requests left
const checkRate = () => {
    const octokit = new Octokit({
        auth: ghToken
    })
    octokit.request('GET /rate_limit', {}).then((response) =>
        console.log(`Limit: ${response.data.rate.limit} | Remain: ${response.data.rate.remaining}`)
    );
}

// FN: CLEAR INPUTS
const clearInputs = () => {
    input1Ref.current.value = '';
}

// FN: CLEAR INPUTS ON AUTOCOMPLETE
setTimeout(() => {
    const close = document.getElementsByClassName(
        "MuiAutocomplete-clearIndicator"
    )[0];
    close.addEventListener("click", () => {
        setKeyword('');
    });
}, 0);
