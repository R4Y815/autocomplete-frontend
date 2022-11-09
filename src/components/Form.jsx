import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// from component folder


const ghToken = process.env.GH_TOKEN;

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

    /*     // FN: Helper: RETURN DIFFERENCE BETWEEN 2 Sets
        const difference = (oldSet, newSet) => {
            if (oldSet.size === 0) {
                const diffSet = new Set(newSet);
                for (const elem of oldSet) {
                    diffSet.delete(elem);
                }
                return diffSet
            }
            const diffSet = new Set(oldSet);
            for (const elem of newSet) {
                diffSet.delete(elem);
            }
            return diffSet
        }
    
        // FN: Helper: RETURN DIFFERENCE BETWEEN 2 Arrays
        const findDiff = (oldArray, newArray) => {
            const oldArraySet = new Set(oldArray,);
            const newArraySet = new Set(newArray);
            const diff = difference(oldArraySet, newArraySet);
    
            if (diff.size > 0) {
                const diffOut = Array.from(diff);
                return diffOut;
            }
            else {
                return [];
            }
        } */

    // FN: RUN SEARCH for Each letter input:
    const possibleWords = (keyword) => {
        axios.get(`https://api.github.com/search/topics?q=${keyword}&per_page=5`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': ghToken
            }
        })
            .then((results) => {
                const tempTitles = [];
                const items = results.data.items;
                const blankArray = [];
                setPossibles(blankArray);
                items.forEach((x) => {
                    if (x.name.includes(keyword)) { tempTitles.push(x.name) }
                });
                setPossibles(tempTitles);
                /*              // CODE THAT DIDN't REALLY WORK -   
                                // Compare this array with the old and return the diff:
                                console.log('tempTitles =', tempTitles);
                                const newMatches = findDiff(possibles, tempTitles);
                                console.log('newMatches =', newMatches);
                                // Combine difference and return diff with old matches:
                                const newPossibles = [...possibles, ...newMatches];
                                setPossibles(newPossibles); */

                // RECURRENT PROBLEM:
                // 'bug-tra' -> correctly displays 5 results
                // when 'bug-tra' -> 'bug-trac' becomes 10 results... ( repeat 5. )
                // how about comparing the returned array with the existing state array?
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