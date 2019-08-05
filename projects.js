var projects = {
    projectId: null,
    headers: {},
    project: {},
    authUser: {},
    edit: true,
    api: 'http://localhost:8000/api/',
    getTasks: function()
  	{
		    axios.get(`${projects.api}projects/${projects.projectId}/tasks`, projects.headers).then(function(tasksRes) {
		            let tasks = tasksRes.data;



            if(tasks.length == 0) // show placeholder text if no tasks
            {
              document.querySelector("#placeholder").innerText = 'No tasks'
            } else 
            {
              var tasksList = document.querySelector(".list-group")
              tasksList.innerHTML = '';
             tasks.forEach(function(t) {
                var li =  document.createElement('li');
                li.classList.add('list-group-item')
                var projectDescriptionTextNode = document.createTextNode(t.description);
                li.appendChild(projectDescriptionTextNode); // create the basic listitem
                if(t.done == 1)
                {
                  li.classList.add('done');
                  li.classList.add('disabled')
                }

                if(projects.project.manager_id == projects.authUser.id || projects.authUser.role == 'admin') // if admin or owner of the project, add checkbox and respective listeners
                {
                  var checkbox = document.createElement('input');
                  checkbox.type = 'checkbox';

                  checkbox.classList.add('input');
                  checkbox.classList.add('float-right')
                  checkbox.value = t.id
                  checkbox.checked = t.done == 0 ? false : true;

                  checkbox.addEventListener('change', function(e) { // to toggle done of a task
                      var done = e.target.checked === true ? 1 : 0;
                      axios.patch(`${prjects.api}projects/${projects.project.id}/tasks/${t.id}`, {done}, projects.headers).then(function(toggleDoneRes) {
                         //init(project.id, headers, project, authUser)
                         projects.getTasks();
                      }).catch(function(toggleDoneErr) {
                        console.log(toggleDoneErr);
                      })
                      
                  });

                  if(projects.edit)
                  {

	                  li.addEventListener('mouseenter', function(e) { // to show pen in list-item

	                   // e.stopPropagation();

	                    //if(authUser.id == project.manager_id || authUser.role == 'admin')
	                    //{

	                      var i = document.createElement('i');

	                      i.classList.add('fas');
	                      i.classList.add('fa-pen');
	                      i.classList.add('float-right')
	                      i.classList.add('margin-right-1')

	                    



	                       i.addEventListener('click', function(){



	                        t.isEditable = true
	                        var editTaskDescriptionForm = document.createElement('form')
	                        var textInput = document.createElement('input')
	                        textInput.type = 'text';
	                        textInput.classList.add('form-control')
	                        textInput.value = t.description;
	                        editTaskDescriptionForm.appendChild(textInput)

	                        editTaskDescriptionForm.addEventListener('submit', function(e) {
	                          e.preventDefault();

	                          axios.patch(`${projects.api}projects/${projects.project.id}/tasks/${t.id}`, {description: textInput.value}, projects.headers).then(function() {
	                            //init(project.id, headers, project, authUser)
	                            projects.getTasks();
	                          }).catch(function(patchTaskErr) {
	                            console.log(patchTaskErr)
	                          })
	                           

	                           
	                        });

	                        textInput.addEventListener('keyup', function(e) { // listen to esc key stroke to cancel editing the task
	                          if(e.keyCode == 27){
	                            //init(project.id, headers, project, authUser)
	                            projects.getTasks();
	                          }
	                        })


	                        li.innerHTML = '';
	                        li.appendChild(editTaskDescriptionForm);
	                        
	                        
	                      });


	                      if(t.isEditable !== true && t.done == 0)
	                      {
	                        li.appendChild(i)
	                      }


	                      li.addEventListener('mouseleave', function(e){ // to remove pen from list item

	                      

	                        var i = this.querySelector('.fas');
	                        if(i != null)
	                        {
	                          li.removeChild(i)
	                        }
	                    
	                    })


	                     

	                     
	                  //  } // if(project.manager_id == authUser.id || authUser.role == 'admin')


	                    

	                });
	              }

                  



                  li.appendChild(checkbox)





              } // if(project.manager_id == authUser.id || authUser.role == 'admin')
                
                tasksList.appendChild(li)
                
              })

              

            } // if projexts.length == 0 else
          }).catch(function(tasksErr) {
            console.log(tasksErr)
          })
  		}
  }