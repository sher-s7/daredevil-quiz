let state = {
	questions: [
		{
			text:"What was the year of Daredevil's first appearance in the Marvel comics?",
			choices: ['1963','1964','1969','1972'],
			correctAnswerIndex: 0
		},
		{
			text:"What is Daredevil's real name?",
			choices: ['Andrew Murdock','Matthew Nelson','Andrew Nelson','Matthew Murdock'],
			correctAnswerIndex: 3
		},
		{
			text:"What is Daredevil's father's name?",
			choices: ['Michael','Jack','Wilson','Winston'],
			correctAnswerIndex: 1
		},
		{
			text:"What is Daredevil's middle name?",
			choices: ['Michael','Jack','Wilson','Winston'],
			correctAnswerIndex: 0
		},
		{
			text:"Who is Daredevil's most notable enemy?",
			choices: ['Wilson Fisk, a.k.a. Kingpin','Mysterio','Bullseye','The Hand'],
			correctAnswerIndex: 0
		},
		{
			text:"Other than red, what other colours has Daredevil's suit been?",
			choices: ['Yellow','Green','Orange','White'],
			correctAnswerIndex: 0
		},
		{
			text:"How did Daredevil get his powers?",
			choices: ['A radioactive substance','The Hand','A man named Stick','Being tested on by scientists'],
			correctAnswerIndex: 0
		},
		{
			text:"Where is Daredevil from?",
			choices: ['Harlem',"K'un-Lun","Hell's Kitchen",'London'],
			correctAnswerIndex: 2
		},
		{
			text:"Which actor plays Daredevil in the Netflix show?",
			choices: ['Elden Henson','Ben Affleck','Danny Rand','Charlie Cox'],
			correctAnswerIndex: 3
		},
		{
			text:"Is Daredevil religious?",
			choices: ['Yes, Catholic','No','Yes, Bhuddist','Yes, Satanist'],
			correctAnswerIndex: 0
		}

	],
	currentQuestionIndex: 0,
	score: 0
}

function checkAnswer(answer, real){
	if(answer === real){
		$(`.box${state.currentQuestionIndex+1}`).addClass('green');
		state.score++;
	}else{
		$(`.box${state.currentQuestionIndex+1}`).addClass('red');
	}

}

function renderQuestion(){
	let currentQuestionIndex = state.currentQuestionIndex;
	$('.question-text').text(state.questions[currentQuestionIndex].text);
	let numChoices = state.questions[currentQuestionIndex].choices.length;
	$('.choices').empty();
	for(let i=0;i<numChoices;i++){
		let choice = state.questions[currentQuestionIndex].choices[i];
		console.log(choice);
		$('.choices').append(`<input type="radio" name="choice" value=${i}><label for="choice">${choice}</label><br>`);
	}
	console.log(numChoices);
	if(currentQuestionIndex<state.questions.length-1){
		$('.next-button').text('Next');
	}else{
		$('.next-button').text('Finish');
	}
}

function renderFinalPage(){
	$('.questions').attr('id','hidden');
	$('.final-page').removeAttr('id');
	let score = state.score;
	let outOf = state.questions.length;
	$('.score').append(`<span class="score-color">${score}</span>/${outOf}`)
	if(score<(outOf/2)){
		$('.message').append('You failed, time to watch Daredevil.')
		$('.score-color').addClass('score-red');
	}else if(score === outOf){
		$('.message').append("You're a Daredevil master.")
		$('.score-color').addClass('score-blue');
	}else{
		$('.message').append('Good job, you passed.')
		$('.score-color').addClass('score-green');
	}

	$('.reset-button').on('click', function(e){
		state.currentQuestionIndex = 0;
		state.score = 0;
		$('.start').removeAttr('id');
		$('.question-text, .choices, .checkboxes, .message, .score').empty();
		// $('.choices').empty();
		$('.questions, .final-page, .checkboxes').attr('id', 'hidden');
		//$('.checkboxes').empty();
		//$('.final-page').attr('id', 'hidden');
	})
}

function renderCheckboxes(){
	let numBoxes = state.questions.length;
	for(let i=1;i<=numBoxes;i++){
		$('.checkboxes').append(`<div class="box box${i}"></div>`)
	}
}


$('.question').submit(function(e){
	e.preventDefault();
	let userAnswerIndex =  $("input[name='choice']:checked").val();
	let realAnswerIndex = state.questions[state.currentQuestionIndex].correctAnswerIndex;
	console.log(userAnswerIndex);
	console.log(realAnswerIndex);
	checkAnswer(parseInt(userAnswerIndex), realAnswerIndex);
	state.currentQuestionIndex++;
	if(state.currentQuestionIndex<state.questions.length){
		renderQuestion();
	}else{
		renderFinalPage();
	}


})



$('.start').submit(function(e){
	e.preventDefault();
	$('.start').attr('id','hidden');
	$('.questions, .checkboxes').removeAttr('id');
	renderCheckboxes();
	renderQuestion();
})




	

