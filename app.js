//Optional Section Show/Hide button
function collapseButton() {
    let collapseBtn = document.querySelector(".info-3-part1 button");
    let toggle = 1;

    collapseBtn.addEventListener("click", () => {
        let infoSection = document.querySelector(".info-3-part2");

        toggle % 2 == 0
            ? infoSection.classList.add("hidden")
            : infoSection.classList.remove("hidden");

        toggle++;
    });
}
collapseButton();

//This will prevent arrowUp, arrowDown, plus, numPlus, minus, numMinus key to input anything
let inputField = document.querySelectorAll("input");
inputField.forEach((val) => {
    val.addEventListener("keydown", function (event) {
        console.log(event);
        let keyCodes = [38, 40, 109, 189, 187, 107];
        //arrowUp, arrowDown, plus, plus, minus, minus
        if (keyCodes.includes(event.keyCode)) {
            event.preventDefault();
        }
    });
});

//Dom
//No need to work
form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Inputs
});
//
//End
//Start

//Status check
let currentAgeStatus = true; //
let retireAgeStatus = true;
let deathAgeStatus = true;
let annualIncomeStatus = true; //
let currentSavingStatus = true; //
let monthlySavingStatus = true;
let monthlyRetirementSpendingStatus = true;
let investmentRateStatus = true;

//Variables
let currentAge = document.querySelector("#age").value;
let retireAge = document.querySelector("#retireAge").value;
let deathAge = document.querySelector("#deathAge").value;
let annualIncome = document.querySelector("#yearlyIncome").value;
let currentSaving = document.querySelector("#currentSavings").value;
let monthlySaving = document.querySelector("#monthlySavings").value;
let monthlyRetirementSpending =
    document.querySelector("#monthlySpendings").value;
let investmentRate = document.querySelector("#investmentRate").value;
//converted from percentage
let annualInvestment = investmentRate / 100;
let annualInflation = 3 / 100; //Fixed
let annualRetirement = 5 / 100; //Fixed
let toMonth = 1 / 12;

let status = true;

function youHave(
    current_Age,
    retire_Age,
    current_Saving,
    monthly_Saving,
    annual_Investment
) {
    //This will help to calculate => Monthly Investment Rate of Return, Monthly Inflation Rate & Monthly Rate of Return in Retirement
    let monthlyRate = (rateName) => Math.pow(1 + rateName, toMonth) - 1;

    function part01() {
        let power = retire_Age - current_Age + toMonth;

        let step01 = Math.pow(1 + annual_Investment, power);
        return current_Saving * step01;
    }

    function part02() {
        let power = (retire_Age - current_Age) * 12;

        let step01 = Math.pow(1 + monthlyRate(annual_Investment), power) - 1;
        let step02 = step01 / monthlyRate(annual_Investment);

        let step03 = 1 + monthlyRate(annual_Investment);

        return monthly_Saving * step02 * step03;
    }
    // console.log(" part01() =" + part01());
    // console.log(" part02() =" + part02());
    return part01() + part02();
}
function youNeed(
    current_Age,
    retire_Age,
    death_Age,
    monthly_Retirement_Spending
) {
    let power = (death_Age - retire_Age) * 12;
    let monthlyRate = (rateName) => Math.pow(1 + rateName, toMonth) - 1;

    let monthlyRetirementSpendingAdjust =
        monthly_Retirement_Spending *
        Math.pow(1 + annualInflation, retire_Age - current_Age);

    if (annualRetirement - annualInflation != 0) {
        let step01 =
            monthlyRate(annualRetirement) - monthlyRate(annualInflation);

        let step02 = monthlyRetirementSpendingAdjust / step01;

        let step03 = Math.pow(
            (1 + monthlyRate(annualInflation)) /
                (1 + monthlyRate(annualRetirement)),
            power
        );

        return step02 * (1 - step03);
    } else if (annualRetirement - annualInflation == 0) {
        let step01 =
            monthlyRate(annualRetirement) -
            monthlyRate(annualInflation) -
            0.0001;
        let step02 = monthlyRetirementSpendingAdjust / step01;

        let step03 = Math.pow(
            (1 + monthlyRate(annualInflation) + 0.0001) /
                (1 + monthlyRate(annualRetirement)),
            power
        );

        return step02 * (1 - step03);
    }
    //
}

//Array of Inputs
let allInput = [
    document.querySelector("#age"),
    document.querySelector("#yearlyIncome"),
    document.querySelector("#currentSavings"),
];
//Show output
//After giving input it will work
allInput.forEach((val) => {
    val.addEventListener("keyup", () => {
        //updating values in variable
        // currentAge = document.querySelector("#age").value;
        // retireAge = document.querySelector("#retireAge").value;
        // deathAge = document.querySelector("#deathAge").value;
        // annualIncome = document.querySelector("#yearlyIncome").value;
        // currentSaving = document.querySelector("#currentSavings").value;
        // monthlySaving = document.querySelector("#monthlySavings").value;
        // monthlyRetirementSpending =
        //     document.querySelector("#monthlySpendings").value;
        // investmentRate = document.querySelector("#investmentRate").value;
        // annualInvestment = investmentRate / 100;
        inputValidation();

        if (status) {
            outputToDom(
                youHave(
                    currentAge,
                    retireAge,
                    currentSaving,
                    monthlySaving,
                    annualInvestment
                ),
                youNeed(
                    currentAge,
                    retireAge,
                    deathAge,
                    monthlyRetirementSpending
                )
            );
        }
    });
    //
});

//Show output
//after clicking outside the input tag, it will show output
window.addEventListener("click", (event) => {
    if (event.target.tagName != "INPUT") {
        // currentAge = document.querySelector("#age").value;
        // retireAge = document.querySelector("#retireAge").value;
        // deathAge = document.querySelector("#deathAge").value;
        // annualIncome = document.querySelector("#yearlyIncome").value;
        // currentSaving = document.querySelector("#currentSavings").value;
        // monthlySaving = document.querySelector("#monthlySavings").value;
        // monthlyRetirementSpending =
        //     document.querySelector("#monthlySpendings").value;
        // investmentRate = document.querySelector("#investmentRate").value;
        // annualInvestment = investmentRate / 100;

        inputValidation();

        inputValidation();

        if (status) {
            outputToDom(
                youHave(
                    currentAge,
                    retireAge,
                    currentSaving,
                    monthlySaving,
                    annualInvestment
                ),
                youNeed(
                    currentAge,
                    retireAge,
                    deathAge,
                    monthlyRetirementSpending
                )
            );
        }
    }
});

//Show output
//After clicking on Increment & Decrement button, it will change the value
let increaseDecreaseBtn = document.querySelectorAll(".button-input button");
increaseDecreaseBtn.forEach((val) => {
    val.addEventListener("click", () => {
        let parent = val.parentElement.parentElement;
        let input = parent.querySelector("input");

        //if else started
        if (val.className == "decrease") {
            if (input.id == "monthlySavings") {
                input.value = Number(input.value) - 50;
            } else if (input.id == "monthlySpendings") {
                input.value = Number(input.value) - 100;
            } else if (input.id == "retireAge" || input.id == "deathAge") {
                input.value = Number(input.value) - 1;
            } else if (input.id == "investmentRate") {
                input.value = Number(input.value) - 0.5;
            }
            //
        } else if (val.className == "increase") {
            if (input.id == "monthlySavings") {
                input.value = Number(input.value) + 50;
            } else if (input.id == "monthlySpendings") {
                input.value = Number(input.value) + 100;
            } else if (input.id == "retireAge" || input.id == "deathAge") {
                input.value = Number(input.value) + 1;
            } else if (input.id == "investmentRate") {
                input.value = Number(input.value) + 0.5;
            }
        }
        //if else ended

        //updating values in variable
        // currentAge = document.querySelector("#age").value;
        // retireAge = document.querySelector("#retireAge").value;
        // deathAge = document.querySelector("#deathAge").value;
        // annualIncome = document.querySelector("#yearlyIncome").value;
        // currentSaving = document.querySelector("#currentSavings").value;
        // monthlySaving = document.querySelector("#monthlySavings").value;
        // monthlyRetirementSpending =
        //     document.querySelector("#monthlySpendings").value;
        // investmentRate = document.querySelector("#investmentRate").value;
        // annualInvestment = investmentRate / 100;
        inputValidation();

        if (status) {
            outputToDom(
                youHave(
                    currentAge,
                    retireAge,
                    currentSaving,
                    monthlySaving,
                    annualInvestment
                ),
                youNeed(
                    currentAge,
                    retireAge,
                    deathAge,
                    monthlyRetirementSpending
                )
            );
        }
    });
});

//This will show output to HTML page
function outputToDom(willHave, willNeed) {
    //This will calculate percentage (Limit for 0 and 100)
    let parcent = () => {
        let parcent = Math.round((willHave * 100) / willNeed);
        if (parcent <= 0) {
            parcent = 0;
        } else if (parcent >= 100) {
            parcent = 100;
        }
        return parcent;
    };

    function monthlySavePercent() {
        let parcent = Math.round((monthlySaving * 100) / (annualIncome / 12));
        document.querySelector(
            ".info-2 small"
        ).innerHTML = `${parcent}% of my monthly income`;
    }
    monthlySavePercent();

    function retireAgeShow() {
        let retireAge0 = document.querySelector(".retireAgeShow");

        retireAge0.innerHTML = retireAge;
    }
    retireAgeShow();
    //This will show the amount
    function amountShow() {
        let haveAmount = document.querySelector(".have-amount");
        let needAmount = document.querySelector(".need-amount");
        haveAmount.innerHTML = (willHave / 1000000).toFixed(2) + "M";
        needAmount.innerHTML = (willNeed / 1000000).toFixed(2) + "M";
    }
    amountShow();

    //It will show the percentage
    function percentShow() {
        let percentClass = document.querySelector(".parcent");
        percentClass.innerHTML = parcent() + "%";
    }
    percentShow();

    //It will move the horizontal bar
    function horizontalProgress() {
        let first = document.querySelector(".attention-describe");
        let second = document.querySelector(".onWay-describe ");
        let third = document.querySelector(".gettingClose-describe");
        let fourth = document.querySelector(".onTrack-describe");

        let moveDiv = document.querySelector(
            ".horizontal-progress .move .space"
        );
        let moveIcon = document.querySelector(
            ".horizontal-progress .icon .iconSpace"
        );
        let haveBar = document.querySelector(".verticale-progress .have-bar");

        //This will add hidden class and remove hidden class
        function hiddenClassAdd(position) {
            [first, second, third, fourth].forEach((val) => {
                val == position
                    ? val.classList.remove("hidden")
                    : val.classList.add("hidden");
            });
        }

        //This will calculate icon position
        function moveIconPosition() {
            let step1 = 65.5 * 0.49; //to get accuracy used 0.49 instead of 0.5
            // 65.5 - 0 = 65.5  //1st part
            //32 - 0 = 32    //icon position in 1st part
            // 32 / 65.5 = 0.49
            let step2 = 15 * 1.87; //to get accuracy used 1.86 instead of 1.87
            //80.5 - 65.5 = 15  //2nd part
            //60 - 32 = 28      //Icon position in 2nd part
            //28 / 15 = 1.87
            let step3 = 15 * 1.47;
            //95.5 - 80.5 = 15; //3rd part
            //82 - 60 = 22      //Icon position in 3rd part
            //22 / 15 = 1.47
            let step04 = 4.5 * 4; //it has no need.
            //100 - 95.5 = 4.5  //4th part
            //100 - 82 = 18      //Icon position in 4th part
            //18 / 4.5 = 4

            if (parcent() > 0 && parcent() <= 65.5) {
                return parcent() * 0.5;
            } // 65.5 - 0 = 65.5
            else if (parcent() >= 65.6 && parcent() <= 80.5) {
                return step1 + (parcent() - 65.5) * 1.87;
            } //80.5 - 65.5 = 15
            else if (parcent() >= 80.6 && parcent() <= 95.5) {
                return step1 + step2 + (parcent() - 80.5) * 1.47;
            } //95.5 - 80.5 = 15
            else if (parcent() >= 95.6 && parcent() <= 100) {
                return step1 + step2 + step3 + (parcent() - 95.5) * 3.44;
            } //100 - 95.5 = 4.5
        }

        //This will calculate moveBar position
        function moveBarPosition() {
            let step1 = 65.5 * 0.344;
            // 65.5 - 0 = 65.5  //1st part
            ////18.5 - 0 = 18.5    //moveBar position in 1st part
            //22.5 - 0 = 22.5    //moveBar position in 1st part NEW
            // 22.5 / 65.5 = 0.344
            let step2 = 15 * 1.87;
            //80.5 - 65.5 = 15  //2nd part
            //4//7.5 - 18.5 = 29      //moveBar position in 2nd part
            //50.5 - 22.5 = 28      //moveBar position in 2nd part NEW
            //28 / 15 = 1.87
            let step3 = 15 * 1.43;
            //95.5 - 80.5 = 15; //3rd part
            ////68.5 - 47.5 = 21      //moveBar position in 3rd part
            //72 - 50.5 = 21.5      //moveBar position in 3rd part NEW
            //21.5 / 15 = 1.43;
            let step04 = 4.5 * 0.88; //it has no need.
            //100 - 95.5 = 4.5  //4th part
            ////70.5 - 68.5 = 2      //moveBar position in 4th part
            //76 - 72 = 4      //moveBar position in 4th part NEW
            //4 / 4.5 = 0.88

            if (parcent() > 0 && parcent() <= 65.5) {
                return parcent() * 0.344;
            } //
            else if (parcent() >= 65.6 && parcent() <= 80.5) {
                return step1 + (parcent() - 65.5) * 1.87;
            } //
            else if (parcent() >= 80.6 && parcent() <= 95.5) {
                return step1 + step2 + (parcent() - 80.5) * 1.43;
            } //
            else if (parcent() >= 95.6 && parcent() <= 100) {
                return step1 + step2 + step3 + (parcent() - 95.5) * 0.67;
            }
        }

        if (parcent() > 0 && parcent() <= 65.5) {
            hiddenClassAdd(first);

            moveIcon.style.flexBasis = `${moveIconPosition()}%`;
            moveDiv.style.flexBasis = `calc(${moveBarPosition()}% - 26px)`;
            haveBar.style.backgroundColor = "#fc6f56";
        } else if (parcent() >= 65.6 && parcent() <= 80.5) {
            hiddenClassAdd(second);

            moveIcon.style.flexBasis = `${moveIconPosition()}%`;
            moveDiv.style.flexBasis = `calc(${moveBarPosition()}% - 12px)`;
            haveBar.style.backgroundColor = "#ffbf00";
        } else if (parcent() >= 80.6 && parcent() <= 95.5) {
            hiddenClassAdd(third);

            moveIcon.style.flexBasis = `${moveIconPosition()}%`;
            moveDiv.style.flexBasis = `calc(${moveBarPosition()}% - 12px)`;
            haveBar.style.backgroundColor = "#1cacca";
        } else if (parcent() >= 95.6 && parcent() <= 100) {
            hiddenClassAdd(fourth);

            moveIcon.style.flexBasis = `${moveIconPosition()}%`;
            moveDiv.style.flexBasis = `calc(${moveBarPosition()}% - 12px)`;
            haveBar.style.backgroundColor = "#8fd832";
        }
    }
    horizontalProgress();

    function verticalProgress() {
        let haveSubBar = document.querySelector(".output .sub-have-bar");
        let needSubBar = document.querySelector(".output .sub-need-bar");

        let haveAmount = document.querySelector(".output .have-amount");
        let needAmount = document.querySelector(".output .need-amount");

        let percentage;

        if (willHave < willNeed) {
            percentage = Math.round((willHave * 100) / willNeed);

            haveSubBar.style.height = `${100 - percentage}%`;
            needSubBar.style.height = `${0}%`;

            haveAmount.style.top = `${100 - percentage - 20}%`;
            needAmount.style.top = "-20%";
        } //
        else if (willHave > willNeed) {
            percentage = Math.round((willNeed * 100) / willHave);

            haveSubBar.style.height = `${0}%`;
            needSubBar.style.height = `${100 - percentage}%`;

            haveAmount.style.top = "-20%";
            needAmount.style.top = `${100 - percentage - 20}%`;
        }
    }
    verticalProgress();
}

//This will validate onTyping inputs
function inputValidation() {
    //updating values in variable
    retireAge = document.querySelector("#retireAge").value;
    deathAge = document.querySelector("#deathAge").value;
    monthlySaving = document.querySelector("#monthlySavings").value;
    monthlyRetirementSpending =
        document.querySelector("#monthlySpendings").value;
    investmentRate = document.querySelector("#investmentRate").value;
    annualInvestment = investmentRate / 100;

    //This will validate current age
    if (document.querySelector("#age").value < 18) {
        currentAgeStatus = false;
        document.querySelector(".info-1 .errors1").innerHTML =
            "Age must be at least 18";
    } else if (document.querySelector("#age").value > 90) {
        currentAgeStatus = false;

        document.querySelector(".info-1 .errors1").innerHTML =
            "Age must be at most 90";
    } else if (
        document.querySelector("#age").value >= 18 &&
        document.querySelector("#age").value <= 90
    ) {
        currentAgeStatus = true;
        document.querySelector(".info-1 .errors1").innerHTML = "";

        currentAge = document.querySelector("#age").value;
    }

    //This will validate annual income
    if (document.querySelector("#yearlyIncome").value < 0) {
        annualIncomeStatus = false;

        document.querySelector(".info-1 .errors2").innerHTML =
            "Pre-tax income should be 0 or more.";
    } else if (document.querySelector("#yearlyIncome").value > 9000000) {
        annualIncomeStatus = false;

        document.querySelector(".info-1 .errors2").innerHTML =
            "Pre-tax income shouldn't be more than 9000000";
    } else if (
        document.querySelector("#yearlyIncome").value >= 0 &&
        document.querySelector("#yearlyIncome").value <= 9000000
    ) {
        annualIncomeStatus = true;
        document.querySelector(".info-1 .errors2").innerHTML = "";
        annualIncome = document.querySelector("#yearlyIncome").value;
    }

    //This will validate current saving
    if (document.querySelector("#currentSavings").value < 0) {
        currentSavingStatus = false;

        document.querySelector(".info-1 .errors3").innerHTML =
            "Current savings should be 0 or more.";
    } else if (document.querySelector("#currentSavings").value > 900000000) {
        currentSavingStatus = false;

        document.querySelector(".info-1 .errors3").innerHTML =
            "Current savings shouldn't be more than 900000000";
    } else if (
        document.querySelector("#currentSavings").value >= 0 &&
        document.querySelector("#currentSavings").value <= 900000000
    ) {
        currentSavingStatus = true;
        document.querySelector(".info-1 .errors3").innerHTML = "";
        currentSaving = document.querySelector("#currentSavings").value;
    }

    inputValidation02();
}

function inputValidation02() {}

function monthlyIncomeValidation() {}
