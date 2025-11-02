document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm=document.getElementById("expense-tracker");
    const expenseNameInput=document.getElementById("expense-name");
    const expenseAmountInput=document.getElementById("expense-amount");
    const expenseList=document.getElementById("expense-list");
    const totalAmountDisplay=document.getElementById("total-amount");

    let expenses=JSON.parse(localStorage.getItem('expenses')) || [];
    
    function calculateTotal(){
        return expenses.reduce((sum,expense)=> sum+expense.amount,0);
    }

    let totalAmount = calculateTotal();    //this method gets the total amount by adding expenses elements
    updateTotal();
    renderExpenses();

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name=expenseNameInput.value.trim();
        const amount=parseFloat(expenseAmountInput.value.trim());
        
        if (name === "") {
            alert("Please enter an expense name");
            return;
        }
        
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount greater than 0");
            return;
        }

        const newExpense = {
            id: Date.now(),
            name,
            amount,
        };
        expenses.push(newExpense);
        saveExpensesTolocal();
        renderExpenses();
        updateTotal();

        // to clear the input after adding 
        expenseAmountInput.value = "";
        expenseNameInput.value = "";
    });

    function calculateTotal(){
        return expenses.reduce((sum,expense)=> sum+expense.amount,0);
    }

    function saveExpensesTolocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }

    function updateTotal(){
        totalAmount=calculateTotal();
        totalAmountDisplay.textContent=totalAmount.toFixed(2);
    }

    function renderExpenses(){
        expenseList.innerHTML="";
        expenses.forEach(expense => {
            const li=document.createElement('li');
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })
    }



    // this is to remove a partucular expense in a list and again render it back to the page
    expenseList.addEventListener('click',(e)=>{
        if (e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);

            saveExpensesTolocal();
            renderExpenses();
            updateTotal();  
        }
    })
});