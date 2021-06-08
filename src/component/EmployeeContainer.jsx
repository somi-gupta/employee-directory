import React, { Component } from 'react';
import API from "../util/Api";
import Banner from "./Banner";
import EmployeeList from "./EmployeeList";
import Search from "./Search";


class EmployeeContainer extends Component {
    //When you have sub-classes and you want to use props
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }

    state = {
        result:{},
        search:"",
        employees: [],
        employeeDetails: [],
        searchVal:[],
        employeeSortList: [],
        
    }

    componentDidMount(){
        console.log("Employee container mounted")
        this.getEmployee();
    }

    getEmployee = () =>{
        API.getRandomEmployees()  
        .then(res => {
            console.log(res.data.results)
            this.setState({employees: res.data.results})})
        .catch(err => console.log(err.message))
    }
//search the employee directory - solved
    searchInput = () =>{
        let searchVal = this.state.employees.filter((emp) => {
            return(
                emp.name.first.toLowerCase().includes(this.state.search.toLowerCase())||
                emp.name.last.toLowerCase().includes(this.state.search.toLowerCase()) ||
                emp.email.toLowerCase().includes(this.state.search.toLowerCase())
            )
        })
        console.log(searchVal);
        this.setState({employees: searchVal})
    }

    handleInputChange = event =>{
        const value = event.target.value;
        this.setState ({search:value} , () => {
            this.searchInput();
            // this.setState({ emp: true });
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.employeeSortFirstName()||
        this.employeeSortPhone() ||
        this.employeeSortPhone();
      };

      employeeSortEmail = () => {
       let employeeSortList =  this.state.employees.sort((a,b) => {
            var emailA = a.email; // ignore upper and lowercase
            var emailB = b.email; // ignore upper and lowercase
            if (emailA < emailB) {
                return -1;
              }
              if (emailA > emailB) {
                return 1;
              }   
              // phone must be equal
              return 0;
        })
        console.log(employeeSortList);
        this.setState({employees: employeeSortList})
    }

    employeeSortFirstName = () => {
        let employeeSortList =  this.state.employees.sort((a,b) => {
             var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
             var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
             if (nameA < nameB) {
                 return -1;
               }
               if (nameA > nameB) {
                 return 1;
               }   
               // names must be equal
               return 0;
         })
         this.setState({employees:employeeSortList})
     }

     employeeSortPhone = () => {
        let employeeSortList =  this.state.employees.sort((a,b) => {
             var phoneA = a.phone; // ignore upper and lowercase
             var phoneB = b.phone; // ignore upper and lowercase
             if (phoneA < phoneB) {
                 return -1;
               }
               if (phoneA > phoneB) {
                 return 1;
               }   
               // names must be equal
               return 0;
         })
         this.setState({employees:employeeSortList})
     }

    render() { 
        return ( 
            <React.Fragment>
                <Banner />
                <Search handleInputChange={this.handleInputChange}/>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="thead-dark">Image</th>
                        <th className="thead-dark">Name 
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmit} > 
                            <span className = "caret"></span>
                        </button>
                        </th>
                        <th className="thead-dark">Phone
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmit}> 
                            <span className = "caret"></span>
                        </button>
                        </th>
                        <th className="thead-dark">Email
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmit} > 
                            <span className = "caret"></span>
                        </button>
                        </th>
                        <th className="thead-dark">DOB</th>
                    </tr>
                    </thead>
                    <tbody>

                {this.state.employees.map(employee => (
                    <EmployeeList 
                    key={employee.login.uuid}
                    firstName={employee.name.first}
                    lastName={employee.name.last}
                    phone={employee.phone}
                    email={employee.email}
                    icon={employee.picture.medium}
                    DOB={employee.dob.date}
                    />
                ))} 
                  </tbody>
                </table>  
            
            </React.Fragment>

         );
    }
}
 
export default EmployeeContainer;