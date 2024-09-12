const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('input');
const errorLabel = document.querySelector('.error-label');
const progressbar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');
const progressLabel = document.querySelector('.progress-label');
 
const allQuotes = [
    'Raise the bar by completing your goals',
    'Well begun is half done',
    'Just a step away, keep going',
    'Whoa! You just complete all the goals,time for chill:D',
]

const allGoals =  JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    },
}


let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalCount/3 * 100}%`
progressValue.firstElementChild.innerHTML = `${completedGoalCount}/3 completed`
progressLabel.innerText = allQuotes[completedGoalCount]


checkBoxList.forEach((checkbox) => {
   // console.log(checkbox);
   checkbox.addEventListener('click', (e) => {
    //console.log(e)
    const allGoalsAdded = [...inputFields].every(function (input){
        return input.value
    })

    if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('completed')
        //progressValue.style.width = '33.33%'
        const inputId = checkbox.nextElementSibling.id;
        //console.log(inputId);
        allGoals[inputId].completed = !allGoals[inputId].completed;
        completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
        progressValue.style.width = `${completedGoalCount/3 * 100}%`
        progressValue.firstElementChild.innerHTML = `${completedGoalCount}/3 completed`
        progressLabel.innerText = allQuotes[completedGoalCount]
        localStorage.setItem('allGoals', JSON.stringify(allGoals))   
        }
    else
        progressbar.classList.add('show-error');
   })
})

inputFields.forEach((input) =>{
    //console.log(allGoals[input.id]);

    input.value = allGoals[input.id].name
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus', () =>{
        progressbar.classList.remove('show-error');
    })

    input.addEventListener('input', (e) =>{
        if(allGoals[input.id].completed) {
            input.value = allGoals[input.Id].name
            return
        };

        allGoals[input.id].name =input.value; 
        //console.log(allGoals);

        localStorage.setItem('allGoals', JSON.stringify(allGoals))     
    })
})