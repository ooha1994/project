import React from "react";
import JsonData from './data.json';
const displayTable = () => {
    

    const data=[{
        "id": 1,
        "first_name": "Ethelred",
        "last_name": "Slowly",
        "email": "eslowly0@google.es"     
    },
    {
        "id": 2,
        "first_name": "Reta",
        "last_name": "Woolmer",
        "email": "rwoolmer1@miibeian.gov.cn"
        },
        {
        "id": 3,
        "first_name": "Arabel",
       "last_name": "Pestor",
        "email": "apestor2@bloglovin.com"
        }
    ]
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.city}</td>
                </tr>
            )
        }
    )
        return(
            <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Sr.NO</th>
                    <th>Name</th>
                    <th>City</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>

        )


}
export default displayTable;