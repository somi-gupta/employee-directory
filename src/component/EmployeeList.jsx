import React from 'react';
import moment from 'moment';

function EmployeeList(props){
    
    function formatDate(date) {
       var fomatdate = moment(date).format("YYYY-MM-DD");
       return fomatdate;
    }

return(
<tr >
    <td>
        <img alt={props.firstName} src={props.icon} />
    </td>
    <td>
        {props.firstName} {props.lastName}
    </td>

    <td>
        {props.phone}
    </td>

    <td>
        {props.email}
    </td>

    <td>
        {formatDate(props.DOB)}
    </td>
</tr>

)
}

export default EmployeeList;