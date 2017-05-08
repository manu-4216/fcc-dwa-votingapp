//'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayWelcome = document.querySelector('.header--welcome');
   var displayNameHeader = document.querySelector('.header--user-fullname');
   var displayNameProfile = document.querySelector('.profile--user-fullname');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayNameHeader, 'displayName');
         updateHtmlElement(userObject, displayNameProfile, 'displayName');
      } else {
         updateHtmlElement(userObject, displayNameHeader, 'username');
         updateHtmlElement(userObject, displayNameProfile, 'username');
      }
      displayWelcome && displayWelcome.classList.remove('hidden');

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }

   }));
})();
