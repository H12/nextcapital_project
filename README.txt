Known Issues
--------------------------------
1) Receive "The code on this page disabled back and forward caching." message on IE 11 and unable to POST login
	-Suspect this has to do with ajax call in the API, unsure how to address

2) Get "Error: 0" when attempting to login for the first time on new browser, but no error on second attempt
	-Unknown cause, unsure how to address

3) Spacing on the divs goes a bit wonky when the window is sized smaller
	-Can be fixed with better CSS

4) App doesn't work properly in https on github page
	-Unsure how to address

Things to Improve
--------------------------------
1) Error handling across the board
	-Over-utilizing "alert()" to:
		-Provide feedback on buttons made non-responsive to prevent bugs
			-Addressable by adding an intuitive "disabled" class to buttons
		-Alert user to login/registration errors
			-Addressable by replacing alerts with html pop-ups

2) Login/Registration
	-Add email verification and password restrictions/confirmation
	-Automatically login user after registration
		-Figure out how to transfer credentials from register() to login()
	-(Optional) Move Login/Registration to separate page
		-Note: Need to figure out how to maintain session on page redirect

3) Text Editing
	-Add rich text editor to replace "contenteditable"
	-Allow for editing of todos after creation
		-Need to figure out how to do this with API
			-Pretty sure "data: { description: [NEW DESCRIPTION] }" would work

Extra Potential Additions/Changes
--------------------------------
1) Color-coding

2) Automatically move completed todos to bottom of list

3) Allow for un-completion of todos

4) Make buttons more dynamic to better fit specific usage
	-E.g. hiding the "Move-Up/Down" and "Mark as Complete" buttons when no to-do is selected

5) Timed alerts