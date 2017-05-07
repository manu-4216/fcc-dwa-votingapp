/* global appUrl  */

'use strict';


/**
 * Controller for the poll
 */
(function () {
   
   var axios = require('axios');
   var utils = require('../common/utils.js');
   
   //var createPollButton = document.querySelector('.btn-create-poll');
   
   var submitPollButton = document.querySelector('.btn-submit-poll');
   var addPollOptionButton = document.querySelector('.btn-add-option');
   
   var pollForm = document.querySelector('poll-form');
   var pollQuestion = document.querySelector('.poll-question');
   var pollOptionList = document.querySelector('.poll-option-list');
   var pollOptionItem = document.querySelectorAll('.poll-option-item');
   
   var pollError = document.querySelector('.poll-error-msg');
   var pollInfo = document.querySelector('.new-poll-info');
   
  
   var apiUrl = appUrl + '/api/:id/polls';

   /**
    * Add click listener on the 'create new pool'
    */
   //createPollButton.addEventListener('click', function (event) {
      //event.preventDefault();
      
      //utils.showContent('.container--create-poll')
   //}, false);
   
   
   
   /**
    * Add click listener on the 'create new pool'
    */
    /*
   createPollButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      utils.showContent('.container--create-poll')
   }, false);
   */
   
   

   /**
    * Get the array of values from the body of the input options
    * @return {array} 
    */
   function getOptionsValue () {
      var optionsText = [];
   
      getPollOptionsBodyElem().forEach(function (option) {
         optionsText.push(option.value)
      })
   
      return optionsText
   }
   
   
   /**
    * Get the list of options body DOM elements.
    * A function is needed, since this list can change.
    * @return {array of DOM elements}
    */
   function getPollOptionsBodyElem () {
       return document.querySelectorAll('.poll-option');
   }
   
   
   /**
    * Cleans the form by reseting the values of input options.
    * @return {/}
    */
   function cleanForm () {
      pollQuestion.value = '';
      getPollOptionsBodyElem().forEach(option => {
         option.value = ''
      })
   }
   
   
   /**
    * Cleans the errors: messages and input options style.
    * @return {/}
    */
   function cleanErrors () {
      pollError.innerHTML = ''
      pollError.classList.add('hidden');
      document.querySelectorAll('.poll-form input').forEach(function (element) {
         element.classList.remove('wrong');
      })
   }
   
   
   /**
    * Cleans the pollInfo.
    * @return {/}
    */
   function cleanPollInfo () {
      pollInfo.innerHTML = ''
   }
   
   
   /**
    * Handles the display of form errors.
    * A function is needed, since this list can change.
    * @param  {array} rawErrors - the list of errors
    * @return {array of DOM elements}
    */
   function displayErrors (rawErrors) {
      var errorsObject = getSimplifiedErrorsObject(rawErrors),
          errorsListHTML = '',
          elementsWithError;
      
      if (errorsObject === {}) {
         return
      }
      
      // Reset styling by removing the class indicating error:
      document.querySelectorAll('.poll-form input').forEach(function (element) {
         element.classList.remove('wrong');
      })
      
      // Make the html changes for each input field with error:
      errorsListHTML += '<ul>';
      Object.keys(errorsObject).forEach(errorKey => {
         errorsListHTML += '<li>' + errorsObject[errorKey] + '</li>';
         elementsWithError = document.querySelectorAll('.poll-form input[name="' + errorKey + '"]');
         elementsWithError.forEach(function (element) {
            element.classList.add('wrong');
         })
         
      });
      errorsListHTML += '</ul>';
      
      pollError.classList.remove('hidden');
      pollError.innerHTML = errorsListHTML;
   }
   
   
   /**
    * Processes a raw XHR error, and returns a simplified version of it.
    * A function is needed, since this list can change.
    * @param  {array} err - raw error
    * @return {object} example: { question: 'Poll question is mandatory', 
    *                             options:  'At least 2 poll options are needed' }
    */
   function getSimplifiedErrorsObject (err) {
      var errorsObject = {};
      
      switch (err.response.status) {
         // Errors of form validation:
         case 403:
            Object.keys(err.response.data.errors).reverse().forEach(errorName => {
               errorsObject[errorName] = err.response.data.errors[errorName].message
            })
            break;
         
         // Other errors:
         default:
            errorsObject['default'] = err.message;
            pollError.innerHTML = err.message
      }
      
      return errorsObject
   }

   
   
   /**
    * Add click listener on the submit button
    * POST message sent: { question: ..., options: [ ... , ... , .... ] }
    */
   submitPollButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      axios.post(apiUrl, {
         question: pollQuestion.value,
         options: getOptionsValue()
      })
      .then(function (response) {
         var newPollLink = response.data;
         
         cleanForm();
         cleanErrors();
         pollInfo.innerHTML = 'Congratulations, your new poll has been created. <br> Link: ' + '<a href="' + newPollLink +'" target="_blank">' + newPollLink + '</a>';
      })
      .catch(function (err) {
         displayErrors(err);
         cleanPollInfo()
      });
   }, false);
   
   
   /**
    * Add click listener on the 'add new pool option' to the list 
    */
   addPollOptionButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      var newOptionItem = pollOptionItem[0].cloneNode(true);
      pollOptionList.appendChild(newOptionItem);
      
      var newOptionBody = newOptionItem.querySelector('.poll-option');
      newOptionBody.value = '';
   }, false);
   
   
})();
