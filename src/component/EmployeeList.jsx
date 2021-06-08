import React from 'react';

function EmployeeList(props){
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
        {props.DOB}
    </td>
</tr>

)
}

export default EmployeeList;