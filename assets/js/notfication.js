window.addEventListener('load', ()=>{
    let notification_array = []
    let display_div = document.querySelector('#notlist')
    fetch('http://127.0.0.1:3000/notification')
        .then((response)=>response.json())
        .then((data)=> {
            notification_array = data;
            notification_array.forEach(notification => {
                display_div.innerHTML += 
                `
                <div class="accordion-item">
                    <h3 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#not-content-${notification.id}">
                        <span class="num"></span>
                        ${notification.title}
                    </button>
                    </h3>
                    <div id="not-content-${notification.id}" class="accordion-collapse collapse" data-bs-parent="#notlist">
                    <div class="accordion-body">
                        ${notification.body}
                    </div>
                    </div>
                    <div class="accordion-footer">
                    <span class="d-flex justify-content-end publish_date ">${notification.date}</span>
                    </div>
                </div>
                `
            });
            console.log('doone');
        })
        .catch((error)=>{console.error(error)})
})
