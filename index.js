    // TODO: Include packages needed for this application
    const inquirer = require('inquirer');
    const fs = require('fs');

    const fileName = './README.md';
    let selectedLicense = "";
    let content = "";
    const licenseOptions = ['MIT', 'XYZ', 'FFHU', 'N/A'];

    const questions = [
        "What is the Title of your README?",
        "What is the Description",
        "Describe the Installation",
        "What is the usage?",
        "What are the Contribution Guidelines?",
        "What are the tests?",
        "Enter your GITHUB user name: ",
        "What is your email address?"
    ];

    let answers = [];

    const tableOfContents = [
        "## TABLE OF CONTENTS",
        "- [DESCRIPTION](#description)",
        "- [INSTALLATION](#installation)",
        "- [USAGE](#usage)",
        "- [TESTS](#tests)",
        "- [QUESTIONS](#questions)",
        "- [LICENSE](#license) \n"
        
    ];

    const headings = [
        "# TITLE",
        "## DESCRIPTION",
        "## INSTALLATION",
        "## USAGE",
        "## CONTRIBUTING",
        "## TESTS",
        "## QUESTIONS",
        " not used",
        "## LICENSE"
    ];


    function appendFile(fileName, content) {
        return new Promise((resolve, reject) => {
            fs.appendFile(fileName, content, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async function writeToFile(fileName, j) {
        console.log("write index j " + j)
        let writeHeading = "";
        let writeData = "";

        if (j >= headings.length) {
            console.log("finished writing")
            return;  
        }
        
        if (j===1){
            for (let y = 0; y < tableOfContents.length; y++) {
                console.log('y ' + y)
                console.log("toc length" + tableOfContents.length)
                content = tableOfContents[y] + "\n";
                await appendFile(fileName, content);
            }

        }

        if (j === 6) {
            console.log("j=6");
            writeHeading = headings[6] ;
            content = writeHeading + "\n";
            await appendFile(fileName, content);
            let workValue = answers[6];
            const gitUrl = `Authors GITHUB is ` + `[GITHub](https://github.com/` + workValue + `) \n\n`;
            content = gitUrl;
            await appendFile(fileName, content);
            return;
        }
        
        if (j===7) {
            let myEmail = answers[7];
            content = "Author's email address is " + myEmail + "\n\n";
            await appendFile(fileName, content);
            return;
        }
        
        writeHeading = headings[j] ;
        content = writeHeading + "\n";
        await appendFile(fileName, content);
        writeData = answers[j];
        content = writeData + "\n\n";
        await appendFile(fileName, content);
        
        if (j === 0 && selectedLicense !== "N/A") {
            console.log("*****License " + selectedLicense);
        //  const licenseBadgeURL = `![badge](https://img.shields.io/badge/license-${encodeURIComponent(selectedLicense)}-blue)`;
            const licenseBadgeURL = `![badge](https://img.shields.io/badge/` + selectedLicense + `-blue) \n\n`;
            content = licenseBadgeURL + "\n";
            await appendFile(fileName, content);
        /*   writeData ="![badge](https://img.shields.io/badge/" + selectedLicense + ") \n";
            content = writeData
            await appendFile(fileName, content); */
            }
    }


    async function init() {
        let i = 0;
        await askQuestions(i);
        await getLicenseInfo();
        console.log("finished license");
        let j = 0;
        for( j = 0; j < headings.length; j++) {
        await writeToFile(fileName, j);
        }
    }
    async function getLicenseInfo() {

        const option = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedOption',
                message: 'Please select which license you used:',
                choices: licenseOptions,
            },
            
        ]);
        selectedLicense = option.selectedOption;
        answers[8] = option.selectedOption;
        console.log('The selected License  ' + selectedLicense);
    
        
    /*  inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'selectedOption',
                    message: 'Please select which license you used:',
                    choices: licenseOptions,
                },
            ])
            .then(licenseResponse => {
                console.log(`You selected: ${licenseResponse.selectedOption}`);
                selectedLicense = "License: " + licenseResponse.selectedOption;
            }); */
    }
    async function askQuestions(i) {
        if (i >= questions.length) {
            console.log("Finished", answers);
            return;
        }
        const response = await inquirer.prompt([
            {
                type: 'input',
                message: questions[i],
                name: 'reply',
            },
        ]);
        answers[i] = response.reply;
        console.log('Answer:', answers[i]);
        await askQuestions(i + 1);
    }

    init();
