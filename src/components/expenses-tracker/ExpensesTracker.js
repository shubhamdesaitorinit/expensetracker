import React, { useState, useEffect } from "react";
import "./ExpnensesTracker.css";
export const ExpensesTracker = () => {
  const [list, setList] = useState([]);
  const [count, setcount] = useState(0);
  const [obj, setObj] = useState({name:'', amount: 0, catagory: ''})
  const [shareObj, setShareObj] = useState({shopType: 25, foodType: 25, travType: 25, otherType: 25})
  // const [name, setName] = useState("");
  // const [amount, setAmount] = useState(0);
  // const [catagory, setCategory] = useState("");
  // const [shoptype, setShoptype] = useState(25);
  // const [foodtype, setFoodtype] = useState(25);
  // const [travType, settravType] = useState(25);
  // const [otherType, setotherType] = useState(25);
  const formChangeHandler = (e) => {
    e.persist()
    if(e.target !== null){
      const value = e.target.value
      setObj((prev)=> {
        return{
          ...prev,
          [e.target.name]: value
        }
      })

    }
  }

  // const changeHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target !== null) {
  //     setName(e.target.value);
  //   }
  // };
  // const changeHandlerAmount = (e) => {
  //   e.preventDefault();
  //   if (e.target !== null) {
  //     setAmount(e.target.value);
  //   }
  // };
  // const selectHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target !== null) {
  //     setCategory(e.target.value);
  //   }
  // };

  const breakfn = () => {
    let expensesTotal = 0;
    let shopExpense = 0;
    let other = 0;
    let traval = 0;
    let food = 0;

    list.map((el) => {
      expensesTotal += Number(el.amount);
      if (el.catagory === "Food") {
        food += Number(el.amount);
      } else if (el.catagory === "Travel") {
        traval += Number(el.amount);
      } else if (el.catagory === "Shopping") {
        shopExpense += Number(el.amount);
      } else if (el.catagory === "Other") {
        other += Number(el.amount);
      }
    });
    setShareObj({
      foodType: Math.floor((food / expensesTotal) * 100),
      shopType: Math.floor((shopExpense / expensesTotal) * 100),
      travType: Math.floor((traval / expensesTotal) * 100),
      otherType: Math.floor((other / expensesTotal) * 100)
    });
    // setFoodtype(Math.floor((food / expensesTotal) * 100));
    // setShoptype(Math.floor((shopExpense / expensesTotal) * 100));
    // settravType(Math.floor((traval / expensesTotal) * 100));
    // setotherType(Math.floor((other / expensesTotal) * 100));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.name === "") {
      return alert("Expense Name required");
    } else if (obj.amount <= 0) {
      return alert("Expense Amount required and should be greater than 0");
    } else if (obj.catagory === "") {
      return alert("Please Choose Expense Type");
    } else {
      const initialState = {
        srNo: count - 1,
        name: obj.name,
        amount: obj.amount,
        catagory: obj.catagory,
      };
      setList((prev) => {
        return [...prev, initialState];
      });
    }
  };

  useEffect(() => {
    breakfn();
    setcount((prev) => prev + 1);
  }, [list]);

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div>
        <form>
          <section
            className="my-30 layout-row align-items-center justify-content-center"
            style={{ width: "1000px" }}
          >
            <input
              type="text"
              value={obj.name}
              onChange={formChangeHandler}
              placeholder="New Expense"
              style={{ width: "40%", marginRight: "10px" }}
              name="name"
              data-testid="expense-name"
            />
            <input
              type="number"
              value={obj.amount}
              onChange={formChangeHandler}
              placeholder="Enter Amount"
              style={{ width: "40%" }}
              name="amount"
              data-testid="expense-amount"
            />
            <select
              onChange={formChangeHandler}
              className="ml-2"
              name="catagory"
              data-testid="expense-type"
            >
              <option value={obj.catagory}>Select Type</option>
              <option data-testid="expense-type-1" value={"Food"}>
                Food
              </option>
              <option data-testid="expense-type-2" value={"Travel"}>
                Travel
              </option>
              <option data-testid="expense-type-3" value={"Shopping"}>
                Shopping
              </option>
              <option data-testid="expense-type-4" value={"Other"}>
                Other
              </option>
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
      <div className="flex" style={{ width: "100%" }}>
        <div style={{ width: "48%" }} className="mx-5 m-10 card">
          <p className="title">Expense List</p>
          <table>
            <thead>
              <tr>
                <td>Sr No</td>
                <td>Expense</td>
                <td>Amount</td>
                <td>Catagory</td>
              </tr>
            </thead>
            <tbody>
              {list.map((exp, i) => {
                return (
                  <tr key={i} data-testid={`expense-list-${i}`}>
                    <td>{exp.srNo}</td>
                    <td>{exp.name}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.catagory}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card ml-5 m-10" style={{ width: "50%" }}>
          <p className="title">Expenses Breakdown</p>
          <br />
          <div style={{ height: "30px", display: "flex" }}>
            <div
              data-testid="expense-distribution-food"
              style={{ width: `${shareObj.foodType}%` }}
              className="lightblue"
            ></div>
            <div
              data-testid="expense-distribution-travel"
              style={{ width: `${shareObj.travType}%` }}
              className="red"
            ></div>
            <div
              data-testid="expense-distribution-shopping"
              style={{ width: `${shareObj.shopType}%` }}
              className="lightgreen"
            ></div>
            <div
              data-testid="expense-distribution-other"
              style={{ width: `${shareObj.otherType}%` }}
              className="orange"
            ></div>
          </div>
          <br />
          <div className="flex ml-10 mb-2">
            <div className="lightblue hight-20 width-20"></div> &nbsp; Food
          </div>
          <div className="flex ml-10 mb-2">
            <div className="red hight-20 width-20"></div> &nbsp; Travel
          </div>
          <div className="flex ml-10 mb-2">
            <div className="lightgreen hight-20 width-20"></div> &nbsp; Shopping
          </div>
          <div className="flex ml-10 mb-10">
            <div className="orange hight-20 width-20"></div> &nbsp; Other
          </div>
        </div>
      </div>
    </div>
  );
};
