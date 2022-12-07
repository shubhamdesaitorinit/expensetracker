import React, {useState, useEffect} from "react"
import "./ExpnensesTracker.css"
export const ExpensesTracker = () => {
  
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [catagory, setCategory] = useState('')
  const [list, setList] = useState([])
  const [shoptype, setShoptype] = useState(25)
  const [foodtype, setFoodtype] = useState(25)
  const [travType, settravType] = useState(25)
  const [otherType, setotherType] = useState(25)
  let expensesTotal = 0
  let shopExpense = 0
  let other = 0
  let traval = 0
  let food = 0
	
  const changeHandler = (e) => {
    // e.preventDefault()
    console.log(e.target)
    if(e.target !== null){
      setName(e.target.value)
    }  
  }
  const changeHandlerAmount = (e) => {
    e.preventDefault()
    console.log(e.target)
    if(e.target !== null){
      setAmount(e.target.value)
    }  
  }
  const selectHandler = (e) => {
    e.preventDefault()
    console.log(e.target)
    if(e.target !== null){
      setCategory(e.target.value)
    }  
  }
  

  const breakfn = () => {
    list.map((el) => {
      expensesTotal += Number(el.amount)
       if(el.catagory === "Food"){
         food += Number(el.amount)
       } else if( el.catagory === "Travel"){
         traval += Number(el.amount)
       } else if( el.catagory === "Shopping"){
        shopExpense += Number(el.amount)
      } else if( el.catagory === "Other"){
        other += Number(el.amount)
      } 
      // console.log( expensesTotal)

    })
    setFoodtype(Math.floor(food/expensesTotal*100))
    setShoptype(Math.floor(shopExpense/expensesTotal*100))
    settravType(Math.floor(traval/expensesTotal*100))
    setotherType(Math.floor(other/expensesTotal*100))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(name === ''){
    return  alert("Expense Name required")
    } else if(amount <= 0) {
      return  alert("Expense Amount required and should be greater than 0")
    } else if(catagory === '' ){
      return  alert("Please Choose Expense Type")
    }else{
      console.log("submitted")
      const initialState = {
        name: name,
        amount: amount,
        catagory: catagory,
      }
      setList((prev) => {
        return[...prev, initialState ]
      })
      
    }

  }
   useEffect(() =>{
    breakfn()
   },[list])

// const foodtype = list.filter(el => el.catagory === 'Food')/\
console.log(foodtype)
	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div>
				<form>
					<section
						className="my-30 layout-row align-items-center justify-content-center"
						style={{ width: "1000px" }}
					>
						<input
							type="text"
              value={name}
              onChange={changeHandler}
							placeholder="New Expense"
							style={{ width: "40%", marginRight: "10px" }}
							name="name"
							data-testid="expense-name"
						/>
						<input
							type="number"
              value={amount}
              onChange={changeHandlerAmount}
							placeholder="Enter Amount"
							style={{ width: "40%" }}
							name="amount"
							data-testid="expense-amount"
						/>
						<select onChange={selectHandler}  className="ml-2" name="catagory" data-testid="expense-type">
							<option value={catagory}>Select Type</option>
							<option data-testid="expense-type-1" value={'Food'}>Food</option>
							<option data-testid="expense-type-2" value={'Travel'}>Travel</option>
							<option data-testid="expense-type-3" value={'Shopping'}>Shopping</option>
							<option data-testid="expense-type-4" value={'Other'}>Other</option>
						</select>
						<button
            onClick={handleSubmit}
							type="submit"
							style={{ width: "20%" }}
							data-testid="expense-submit-button"
						>
							Add Expense
						</button>
					</section>
				</form>
			</div>
			<div className="flex" style={{ width: '100%' }}>
				<div style={{ width: '48%' }} className="mx-5 m-10 card">
					<p className="title">Expense List</p>
					<table >
						<thead>
							<tr>
								<td>Sr No</td>
								<td>Expense</td>
								<td>Amount</td>
								<td>Catagory</td>
							</tr>
						</thead>
						<tbody>
              {
                list.map((exp, i) => {
                  return (<tr>
                  <td>{i}</td>
                  <td>{exp.name}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.catagory}</td>
                </tr>)
                })
              }
					</tbody>
				</table>
			</div>
			<div className="card ml-5 m-10" style={{ width: '50%' }}>
				<p className="title">Expenses Breakdown</p>
				<br />
				<div style={{ height: '30px', display: 'flex' }}>
					<div data-testid="expense-distribution-food" style={{  width:`${foodtype}%`  }} className="lightblue"></div>
					<div data-testid="expense-distribution-travel" style={{ width: `${travType}%`}} className="red"></div>
					<div data-testid="expense-distribution-shopping" style={{ width:  `${shoptype}%`}} className="lightgreen"></div>
					<div data-testid="expense-distribution-other" style={{ width: `${otherType}%`}} className="orange"></div>
				</div>
				<br />
				<div className="flex ml-10 mb-2">
					<div className="lightblue hight-20 width-20"></div> &nbsp; Food
				</div>
				<div className="flex ml-10 mb-2">
						<div className="red hight-20 width-20"></div> &nbsp; Travel
				</div>
				<div className="flex ml-10 mb-2">
						<div className="lightgreen hight-20 width-20" ></div> &nbsp; Shopping
				</div>
				<div className="flex ml-10 mb-10">
						<div className="orange hight-20 width-20"></div> &nbsp; Other
				</div>
			</div>
			</div>
		</div >
	)
}
