import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// from component folder


export default function Form() {
    // STATES
    const [keyword, setKeyword] = useState('');

    // REFS
    const input1Ref = useRef();

    // FN: CLEAR INPUTS
    const clearInputs = () => {
        input1Ref.current.value = '';
    }

    // FN: RUN SEARCH for Each letter input:

    const possibleWords = (keyword) => {
        const labelObjects = [];
        const labelsArray = [];
        const guessOutput = [];


        axios.get(`https://api.github.com/search/issues?q=windows+label:${keyword}`)
            .then((results) => {

                const items = results.data.items
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

    // FN: Controlled Form Inputs
    const handleInputChange = (event) => {
        const input = event.target.value;
        console.log('input = ', input);
        if (input.length != 0) {
            possibleWords(input);
        }
        setKeyword(input);
    }


    return (
        <div>
            <input
                ref={input1Ref}
                type="text"
                size="50"
                placeholder="enter your search keywords here"
                onChange={handleInputChange}
            />
        </div>
    )
}