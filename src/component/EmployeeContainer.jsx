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
        searchVal:[],
        employeeSortList: [],
        sortDirection: false,
        
    }

    componentDidMount(){
        console.log("Employee container mounted")
        this.getEmployee();
    }

    //Get randome employee list
    getEmployee = () =>{
        API.getRandomEmployees()  
        .then(res => {
            console.log(res.data.results)
            this.setState({employees: res.data.results})})
        .catch(err => console.log(err.message))
    }
    //search the employee directory
    searchInput = () =>{
        let searchVal = this.state.employees.filter((emp) => {
            return(
                emp.name.first.toLowerCase().includes(this.state.search.toLowerCase())||
                emp.name.last.toLowerCase().includes(this.state.search.toLowerCase()) ||
                emp.email.toLowerCase().includes(this.state.search.toLowerCase()) ||
                emp.phone.toLowerCase().includes(this.state.search.toLowerCase())
            )
        })
        this.setState({employees: searchVal})
    }

    handleInputChange = event =>{
        const value = event.target.value;
        this.setState ({search:value} , () => {
            this.searchInput();
        })
    }

    handleFormSubmitName = event => {
        event.preventDefault();
        this.employeeSortFirstName()
      };
    
      handleFormSubmitEmail = event => {
        event.preventDefault();
        this.employeeSortEmail();
      };

      handleFormSubmitPhone = event => {
        event.preventDefault();
        this.employeeSortPhone();
      }; 

      //Sort based on email
      employeeSortEmail = () => {
       let employeeSortList =  this.state.employees.sort((a,b) => {
            var emailA = a.email;
            var emailB = b.email; 
            let ans = this.state.sortDirection ? 1 : -1 ;
            if (emailA < emailB) {
                return ans * -1;
              }
              if (emailA > emailB) {
                return ans * 1;
              }   
              // email must be equal
              return 0;
        })
        this.setState({employees: employeeSortList,sortDirection: !this.state.sortDirection })
    }

    //Sort based on first name
    employeeSortFirstName = () => {
        
        let employeeSortList =  this.state.employees.sort((a,b) => {
             var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
             var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
             let ans = this.state.sortDirection ? 1 : -1 ;
             if (nameA < nameB) {
                 return ans * -1;
               }
               if (nameA > nameB) {
                 return ans * 1;
               }   
               // names must be equal
               return 0;
         })
         this.setState({employees:employeeSortList, sortDirection: !this.state.sortDirection })
     }

     //Sort based on Phone
     employeeSortPhone = () => {
        let employeeSortList =  this.state.employees.sort((a,b) => {
             var phoneA = a.phone;
             var phoneB = b.phone; 
             let ans = this.state.sortDirection ? 1 : -1 ;
             if (phoneA < phoneB) {
                 return  ans * -1;
               }
               if (phoneA > phoneB) {
                 return ans * 1;
               }   
               // phone must be equal
               return 0;
         })
         this.setState({employees:employeeSortList, sortDirection: !this.state.sortDirection})
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
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmitName} > 
                            <span className = "caret"></span>
                        </button>
                        </th>
                        <th className="thead-dark">Phone
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmitPhone}> 
                            <span className = "caret"></span>
                        </button>
                        </th>
                        <th className="thead-dark">Email
                        <button type = "button" className = "btn btn-default dropdown-toggle" data-toggle = "dropdown" onClick={this.handleFormSubmitEmail} > 
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