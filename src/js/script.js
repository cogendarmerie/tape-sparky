const helpers = document.querySelectorAll("[data-helper]");

function createHelpMessage(message){
    let messageDOM = document.createElement("div");
    messageDOM.classList.add("help-message");
    messageDOM.textContent = message;
    return messageDOM;
}

helpers.forEach((helper)=>{
    const messageDOM = createHelpMessage(helper.dataset.helper);
    helper.append(messageDOM);
});