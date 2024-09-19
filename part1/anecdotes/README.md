# Description

Show one anecdote per day. 
It has two buttons

1. button "Vote": add a vote to one anecdote. 
2. button ""Next anecdote: You can get another anecdote 

Bellow Show the most voted annecdote.

# What do we learnt?

Hook useState. Every time that we change the state, the component is rerender.  Every time that we click on the "Next anecdote" button, the anecdote component is rerender.

State can not be modified. You have to create a new object and replace the old version. Every time that we vote uno anecdote, the array with the votes is copy and the modified. At the end the copy replace the state.
