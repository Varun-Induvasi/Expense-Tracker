document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm=document.getElementById("expense-form");
    const expenseNameInput=document.getElementById("expense-name");
    const expenseAmountInput=document.getElementById("expense-amount");
    const expenseList=document.getElementById("expense-list");
    const totalAmountDisplay=document.getElementById("total-amount")

    let expenses=[]
    let totalAmount = calculateTotal()    //this method gets the total amount by adding expenses elements

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name=expenseNameInput.value.trim();
        const amount=parseFloat(expenseAmountInput.value.trim());
        
        if (name!="" && amount>0 && !isNaN(amount)) {
            const newExpense={
                id:Date.now(),
                name,
                amount,
            }
            expenses.push(newExpense);
            saveExpensesTolocal();

            // to clear the input after adding 
            expenseAmountInput.value="";
            expenseNameInput.value="";

        }
    })

    function calculateTotal(){

    }

    function saveExpensesTolocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }
})