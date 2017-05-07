
module.exports = {
    showContent: function (newVisibleContent) {
        var newVisibleElem = document.querySelector(newVisibleContent);
        
        // Hides the content that has been visible till now:
        document.querySelector('.root-container>.visible').classList.add('hidden');
        document.querySelector('.root-container>.visible').classList.remove('visible');
    
        // Display the content that needs to become visible:
        newVisibleElem.classList.remove('hidden');
        newVisibleElem.classList.add('visible');
    }
};
