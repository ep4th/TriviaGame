


$(document).ready(function() {
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame) ;
    $(document).on('click' , '.option', trivia.guessChecker);
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0 ,
    unanswered: 0 ,
    currentSet: 0 ,
    timer: 30,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'Who is the prince of Sayains?',
      q2: 'Who does vegeta marry?' ,
      q3: 'How many episodes does planet namek take to explode?',
      q4: 'How many years older is Piccolo than Gohan?',
      q5: "Who defeats Cell?",
      q6: 'Who is Goku terrified of?',
      q7: "Who never dies in the series?"
    },

    options: {
      q1: ['Bardock', 'Vegeta', 'Goku', 'Broly'],
      q2: ['Bulma', 'Chi Chi', 'Frieza', 'Android 17'] ,
      q3: ['8', '2', '1', '3'],
      q4: ['0', '8', '11', '24'],
      q5: ['Gohan','Goku', 'Herecule','Trunks' ],
      q6: ['Frieza','Buu','Cell','Chi Chi'],
      q7: ['Hercule', 'Gohan', 'Krillin','Goku']
    },

    answers: {
      q1: 'Vegeta',
      q2: 'Bulma',
      q3: '8',
      q4: '0',
      q5: 'Gohan',
      q6: 'Chi Chi',
      q7: 'Hercule'
    },

    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show() ;
       $('#results').html('') ;
       $('#timer').text(trivia.timer);
       $('#start').hide() ;
      $('#remaining-time').show();
      trivia.nextQuestion();
      
    } ,
   
    nextQuestion : function() {
      
      trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet] ;
      $('#question').text(questionContent);
    
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4) {
            $('#timer').addClass('last-seconds') ;
          }
      }
      
      else if(trivia.timer === -1) {
        trivia.unanswered++;
        trivia.result = false ;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000) ;
        $('#results').html('<h3>I cant be defeated! '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')

          .html('<h3>Thanks for the awesome battles!</h3>'+
          '<p>Foes Defeated: '+ trivia.correct +'</p>'+
          '<p>Battles lost: '+ trivia.incorrect +'</p>'+
          '<p>Retreats: '+ trivia.unanswered +'</p>'+
          '<p>Namek Needs you!</p>') ;
        
        $('#game').hide();
        $('#start').show();
      }
    },
    
    guessChecker : function() {
      
      var resultId;

      var currentAnswer = Object.values(trivia.answers) [trivia.currentSet] ;
     
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++ ;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000) ;

        $('#results').html('<h3>Youre Good at this!</h3>') ;
      }
      
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>') ;
      }
    },
   
    guessResult : function() {

      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
   
      trivia.nextQuestion();
    }
  }