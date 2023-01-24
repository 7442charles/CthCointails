const URL = 'http://127.0.0.1:3000/api';
window.addEventListener('load', ()=>{
    get_user_profile_details();
    get_notifications();
    get_messages();
})
function select(el) {
    return document.querySelector(el)
}

function get_user_profile_details() {
    fetch(`${URL}/user_profile_details`)
        .then(response=>response.json())
        .then(data=>{
            let parent_user_div = select('#user_details'); /**update the main user card */
            parent_user_div.innerHTML =
                `
                <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src="${data.profile_picture}" alt="Profile" class="rounded-circle">
                    <h2>${data.user_name}</h2>
                    <h3>${data.course}</h3>
                </div>
                `
            /**update message badge accordingly */
            let message_badge = select('#message_badge')
            if (data.new_messages == undefined || data.new_messages <=0) {
              message_badge.remove(); /**removes the badge */
            } else {
              message_badge.innerHTML = `${data.new_messages}`;/**update message badge no */
            }

           /**fill in the small username when user logs in */
           let small_username = select('#small_username')
           small_username.innerHTML = `${data.user_name}`

           /**small user profile pic */
           small_profile_image = select('#small-profile-image')
           small_profile_image.src = `${data.profile_picture}`

           /**update the username next to the logout button */
           let dropdown_username = select('#dropdown_username')
           dropdown_username.innerHTML = `${data.user_name}`

           /**update the course name below then dropdown name */
           let dropdown_course = select('#dropdown_course')
           dropdown_course.innerHTML = `${data.course}`

          /**update messages header with number of new messages */
          let message_header = select('#new-message-span')
          message_header.innerHTML = `You have ${data.new_messages} new messages`

          /**update user about */
          let user_about = select('#user-about')
          if (data.about == "" || data.about == undefined) {
            user_about.innerHTML = ""
          } else {
            user_about.innerHTML = `${data.about}`  
          }
          

          /**update details username */
          let details_username = select('#details_username')
          details_username.innerHTML = `${data.user_name}`

          /**update details course */
          let details_course = select('#details-course')
          details_course.innerHTML = `${data.course}`

          /**update user intake year */
          let intake_year = select('#details-intake-year')
          intake_year.innerHTML = `${data.intake_year}`

          /**display admission no */
          let adm_no = select('#details-adm-no')
          adm_no.innerHTML = `${data.adm_no}`

          /**display Phone number */
          let phone_number = select('#details-phone-no')
          phone_number.innerHTML = `${data.phone_no}`

          /**display user email */
          let details_userEmail = select('#details-user-email')
          details_userEmail.innerHTML = `${data.user_email}`

          /**display profile image on edit page */
          edit_profile_image = select('#edit-profile-image')
          edit_profile_image.src =  `${data.profile_picture}`

          /**display username on edit page  */
          edit_username = select('#fullName')
          edit_username.value = `${data.user_name}`

          /**display about on edit page */
          edit_about = select('#about')
          edit_about.innerHTML = `${data.about}`

          /**display course on edit page */
          edit_course= select('#course')
          edit_course.value = `${data.course}`

          /**display phone no on edit page  */
          edit_phone = select('#Phone')
          edit_phone.value = `${data.phone_no}`

          /**display email on edit page */
          edit_email = select('#Email')
          edit_email.value = `${data.user_email}`

        })
        .catch((error)=>{console.error(error)})
}

/**update the notifications and the notification badges depending on server response */
function get_notifications() {
    fetch(`${URL}/notification`)
        .then(response=>response.json())
        .then(data=>{
          /**assign number of new notifications */
          let parent_div_header = select('#notification_header')
          let notification_badge = select('#notification_badge')
          let new_notifications_no = []
          new_notifications_no = data.length
          if (new_notifications_no <= 0 || new_notifications_no== undefined) {
            parent_div_header.innerHTML =
            `
            <li class="dropdown-header">
                You have no new notifications
                <!--<a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>-->
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
            </div>
            `;
            notification_badge.remove();/**remove nofification badge */

            
          } else {
            parent_div_header.innerHTML =
            `
            <li class="dropdown-header">
                You have ${new_notifications_no} new notifications
                <a href="#functions_tab"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
            </div>
            `;
            notification_badge.innerHTML = `${new_notifications_no}`;/**update nofification badge no  */
          }
          /**end of notification badge number and header update */

          

          /**loop through the array of notifications */
          let notification_array =[data[0],data[1],data[2], data[3]]
          //notification_array= data
          let parent_div = select('#all_notifications')
          notification_array.forEach(item => {
            const mysql_date = item.date_posted;
            const current_date = new Date();
            const mysql_datetime = new Date(mysql_date);
            const diff = current_date - mysql_datetime;
            const diff_in_seconds = diff / 1000;
            const diff_in_minutes = diff_in_seconds / 60;
            const diff_in_hours = Math.floor(diff_in_minutes / 60);
            const diff_in_days = diff_in_hours / 24;
            let long_ago = ""
            if (diff_in_hours <=0) {            /**check if hours are less than zero */
                long_ago = "minutes ago";
            } else {
                long_ago= (`${diff_in_hours} Hour(s) ago`);
            }

              parent_div.innerHTML += 
              `
              <li class="notification-item">
                <i class="bi bi-bell text-info"></i>
                <div>
                  <h4>${item.notification_title}</h4>
                  <p>${item.Notification_body}</p>
                  <p>${long_ago}</p>
                </div>
              </li>

              <li>
                <hr class="dropdown-divider">
              </li>
              `
              //console.log(toDateString(item.date_posted))
          });

          /**main notification */
          const all_notifications = data;
          console.log(all_notifications);
          let div_all_notofication = select('#accordionExample')
          all_notifications.forEach(notification => {
            div_all_notofication.innerHTML += 
            `
            <div class="accordion-item shadow mb-3">
              <h2 class="accordion-header" id="sen${notification.sender_ID}der">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nt${notification.ID}nt" aria-expanded="false" aria-controls="nt${notification.ID}nt">
                ${notification.notification_title}
              </button>
              </h2>
              <div id="nt${notification.ID}nt" class="accordion-collapse collapse" aria-labelledby="sen${notification.sender_ID}der" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <p>${notification.Notification_body}</p>
                  <p><b>Sender:</b>${notification.sender_ID}</p>
                  <p><b>Sent on:</b>${notification.date_posted}</p>
                </div>
              </div>
            </div>

            `
          });

        })
}

/**get all user related messages and update the user message section  */
function get_messages() {
  fetch(`${URL}/messages`)
    .then(response => response.json())
    .then(data=>{
      let message_array =[]
      message_array = data
      let message_div = select('#message-div')
      message_array.forEach(message => {
        message_div.innerHTML += 
        `
        <li class="message-item">
          <a href="#">
            <img src="${message.sender_image}" alt="${message.sender_name}" class="rounded-circle">
            <div>
              <h4>${message.sender_name}</h4>
              <p>${message.message_body}</p>
              <p>${message.date_posted}</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>
        `
      });
    })
}


/**delete profile image on edit section */
let delete_profile_image_btn = select('#delete-profile-image-btn')
delete_profile_image_btn.addEventListener('click', ()=>{
  profile_image = select('#edit-profile-image')
  profile_image.remove()
  console.log('profile image removed')
})

let edit_details_form = select('#details-form')
edit_details_form.onsubmit = (e)=>{
  e.preventDefault()
  let user_phone_no = select('#Phone')
  let user_about = select('#about')
  changedDetails = {
    user_phone: user_phone_no.value,
    user_message: user_about.innerHTML
  }
  fetch(`${URL}/modify-details`,{
    method:'POST',
    body:JSON.stringify(changedDetails),
    headers:{
      "Content-Type":"application/json"
    }
  })
    .then(response =>response.json())
    .then(data=>console.log(data))
    .catch(error=>console.error(error))
}



